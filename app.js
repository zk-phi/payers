function doGet () {
    var template = HtmlService.createTemplateFromFile("index.html");
    template.MAPS_API_KEY = PropertiesService.getScriptProperties().getProperty("MAPS_API_KEY");
    return template.evaluate();
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
