const _data = [
    {
        key: "title",
        xpath: `\/\/*[@id=\"productTitle\"]`,
    },
    {
        key: "image",
        xpath: `\/\/*[@id="landingImage"]`,
        image: true,
    },
];
const getDocumentFromString = (domString) => {
    const domparser = new DOMParser();
    return domparser.parseFromString(domString, "text/html");
};
const getData = (document) => {
    let data = {};
    for (let item of _data) {
        let elem = document.evaluate(
            item.xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        data[item.key] = elem ? elem.innerHTML.toString().trim() : "";
        if (item.image) {
            data[item.key] = elem.src.toString().trim();
        }
    }
    return data;
};
function displayData(data) {
    document.querySelector("#data").innerHTML =
        "<p><b>Product Name:</b> " +
        data[_data[0].key] +
        "</p></br>" +
        "<p><b>Image:</b> <img class='product-image' src='" +
        data[_data[1].key] +
        "'/></p></br>";
}
const displayProductDetail = (dom) => {
    let doc = getDocumentFromString(dom);
    let data = getData(doc);
    displayData(data);
};
chrome.tabs.query({ active: true }, function (tabs) {
    let tab = tabs[0];
    chrome.tabs.executeScript(
        tab.id,
        {
            code: `document.body.innerHTML`,
        },
        displayProductDetail
    );
});
