var TITLE = "お金の貸し借り💰";

function doGet () {
    var template = HtmlService.createTemplateFromFile("index.html");
    template.MAPS_API_KEY = PropertiesService.getScriptProperties().getProperty("MAPS_API_KEY");
    return template.evaluate().setTitle(TITLE);
}

function doFetchLastState () {
    return {
        users: dbFind("kvs", "users"),
        amountDiff: dbFind("kvs", "amountDiff")
    };
}

function doSaveUsernames (users) {
    dbSet("kvs", "users", users);
}
