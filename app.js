var TITLE = "お金の貸し借り💰";
var MAPS_API_KEY = PropertiesService.getScriptProperties().getProperty("MAPS_API_KEY");
var CATEGORIES = [
    { key: 1, label: "ランチ" },
    { key: 2, label: "ディナー" },
    { key: 3, label: "おやつ" },
    { key: 4, label: "遊び" },
    { key: 5, label: "買い物" },
    { key: 6, label: "旅費" },
    { key: 0, label: "他" },
];

function doGet () {
    var template = HtmlService.createTemplateFromFile("index.html");
    template.MAPS_API_KEY = MAPS_API_KEY;

    var html = template.evaluate();
    html.setTitle(TITLE);
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
}

function doFetchLastState () {
    return {
        users: dbFind("kvs", "users") || ["user1", "user2"],
        amountDiff: dbFind("kvs", "amountDiff") || 0,
        log: dbFind("kvs", "log") || [],
        categories: CATEGORIES
    };
}

function doSaveUsernames (users) {
    dbSet("kvs", "users", users);
    return users;
}

function doPay (payer, amount, location, category, timestamp) {
    var log = dbFind("kvs", "log") || [];
    var diff = dbFind("kvs", "amountDiff") || 0;
    log.unshift({ payer: payer, amount: amount, location: location, category: category, timestamp: timestamp });
    diff = payer ? diff + amount : diff - amount;
    dbSet("kvs", "log", log);
    dbSet("kvs", "amountDiff", diff);
    return { log: log, amountDiff: diff };
}
