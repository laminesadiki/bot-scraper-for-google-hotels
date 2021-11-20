const Apify = require("apify");
const { loadHotelsList } = require("./configuration");
const { scrapOverview, scrapAbout, scrapPrices } = require("./scraping");

Apify.main(async () => {
    const input = {
        cityName: "casablanca",
    };
    const browser = await Apify.launchPuppeteer({
        useChrome: true,
    });
    const page = await browser.newPage();

    var url1 = `https://www.google.com/travel/hotels/${input.cityName}?hl=fr`;
    let hotels_links = await loadHotelsList(page, url1);
    var j;

    for (j = 0; j < hotels_links.length; j++) {
        await page.goto(hotels_links[j], { waitUntil: "load", timeout: 0 });

        const overview = await scrapOverview(page, hotels_links[j]);
        const about = await scrapAbout(page);
        const prices = await scrapPrices(page);
        let results = { ...overview, ...about, ...prices };
        await Apify.pushData(results);
        console.log(`hotel ${j + 1} scraped successfully `);
    }
    console.log("End of Scraping");
});
