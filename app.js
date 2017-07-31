var TITLE = "お金の貸し借り💰";
var MAPS_API_KEY = PropertiesService.getScriptProperties().getProperty("MAPS_API_KEY");

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
        log: dbFind("kvs", "log") || []
    };
}

function doSaveUsernames (users) {
    dbSet("kvs", "users", users);
    return users;
}

function doPay (payer, amount, location, memo) {
    var log = dbFind("kvs", "log") || [];
    var diff = dbFind("kvs", "amountDiff") || 0;
    log.unshift({ payer: payer, amount: amount, location: location, memo: memo});
    diff = payer ? diff + amount : diff - amount;
    dbSet("kvs", "log", log);
    dbSet("kvs", "amountDiff", diff);
    return { log: log, amountDiff: diff };
}
