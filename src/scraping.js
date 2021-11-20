// function pour scraper la section overview == Aperçu
exports.scrapOverview = async (page, hotel) => {
    await page.click("#overview").catch(() => {});

    let mainPrice = await page
        .$eval("div.JGa7fd", (el) => el.getAttribute("aria-label"))
        .catch(() => "NULL");
    let hotelName = await page
        .$eval("title", (el) => el.textContent)
        .catch(() => "NULL");
    let description = await page
        .$eval("div.yIr6Rd", (el) => el.textContent)
        .catch(() => "NULL");
    let adress = await page
        .$$eval("div.K4nuhf > span.CFH2De", (el) => el[0].textContent)
        .catch(() => "NULL");
    let phone = await page
        .$$eval("div.K4nuhf > span.CFH2De", (el) => el[2].textContent)
        .catch(() => "NULL");
    let rating = await page
        .$eval("div.iDqPh.BgYkof", (el) => el.textContent)
        .catch(() => "NULL");
    let hotelStar = await page
        .$eval("div.fnmyY > span.CFH2De", (el) => el.textContent)
        .catch(() => "NULL");
    let reviewsNumber = await page
        .$eval("a.eS7K5e", (el) => el.textContent)
        .catch(() => "NULL");
    let website = await page
        .$eval("a.FKF6mc.TpQm9d", (el) => el.getAttribute("href"))
        .catch(() => "NULL");

    let result1 = {
        hotelUrl: hotel,
        hotelName: hotelName,
        mainPrice: mainPrice,
        adress: adress,
        phone: phone,
        rating: rating,
        hotelStar: hotelStar,
        reviewsNumber: reviewsNumber,
        website: website,
        description: description,
    };
    return result1;
};

//function pour scraper la section About == A propos
exports.scrapAbout = async (page) => {
    await page.click("#details").catch(() => {});

    const popularAmenties = await page
        .$$eval("li.XX3dkb.LCuyLe", (lis) =>
            lis.map((li) => li.innerText).join(" | ")
        )
        .catch(() => {});

    const amenties = await page.$$eval("#details div.IYmE3e", (amenties) =>
        amenties.map((amenty) => [
            amenty.querySelector("h4").innerText.toLowerCase(),
            [...amenty.querySelectorAll("ul li")]
                .map((li) => li.innerText)
                .join(" | "),
        ])
    );

    const [
        internet,
        policiesAndPayments,
        enfants,
        parkingAndTransportation,
        Accessibilité,
        animaux,
        Bars_Restaurants,
        services,
        piscines,
        bien_être,
        entreprises_événements,
        chambres,
    ] = [
        "internet",
        "règles",
        "enfants",
        "parking",
        "accessibilité",
        "animaux",
        "bars",
        "services",
        "piscines",
        "Bien-être",
        "entreprises",
        "chambres",
    ].map((am) => {
        let a = amenties.find(([a]) => a.startsWith(am));
        return a && a[1];
    });

    let result2 = {
        popularAmenties: popularAmenties,
        internet: internet,
        policiesAndPayments: policiesAndPayments,
        enfants: enfants,
        parkingAndTransportation: parkingAndTransportation,
        Accessibilité: Accessibilité,
        Animaux: animaux,
        Bars_Restaurants: Bars_Restaurants,
        services: services,
        piscines: piscines,
        Bien_être: bien_être,
        Entreprises_événements: entreprises_événements,
        Chambres: chambres,
    };
    return result2;
};

//function pour scraper les prix
exports.scrapPrices = async (page) => {
    await page.click("#prices").catch(() => {});

    let prices = await page
        .$$eval("#prices .KQO6ob", (prices) =>
            prices.map((price) => [
                price.querySelector(".g32BKd").innerText.toLowerCase(),
                price.querySelector(".nDkDDb").innerText,
            ])
        )
        .catch(() => []);
    let prices_Object = Object.fromEntries(prices);
    return prices_Object;
};
