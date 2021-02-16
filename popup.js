const _data = [
    {
        key: "title",
        xpath: `\/\/*[@id=\"productTitle\"]`,
    },
];
const getDocumentFromString = (domString) => {
    const domparser = new DOMParser();
    return domparser.parseFromString(domString, "text/html");
};
const getData = (document) => {
    let data = {};
    for (let item of _data) {
        data[item.key] = document
            .evaluate(
                item.xpath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            )
            .singleNodeValue.innerHTML.toString()
            .trim();
    }
    return data;
};
function displayData(data) {
    document.querySelector("#title").innerHTML =
        "</p><p><b>Product Name:</b> " + data[_data[0].key] + "</p>";
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
