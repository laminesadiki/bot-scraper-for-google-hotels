//function pour récupérer les liens de tous les hotels
exports.loadHotelsList = async (page, url) => {
    var i;
    var k = 0;
    var hotels_links = [];

    await page.goto(url, { waitUntil: "load", timeout: 0 });
    while (
        (await page.evaluate(() => document.querySelector("div.zbLWdb"))) != null
    ) {
        var links = await page.$$eval("a.PVOOXe", (links) =>
            links.map((link) => link.href)
        );
        for (i = 0; i < links.length; i++) {
            //"a.PVOOXe" est le selector qui contient le lien de chaque hotel
            hotels_links.push(links[i]);
        }
        await page.evaluate(() => document.querySelector("div.zbLWdb").click());

        await page.waitFor(5000);
        console.log(`Scraping page ${k + 1} ...`);
        k++;
    }
    console.log("End scraping pages");

    return hotels_links;
};
