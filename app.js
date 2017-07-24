var TITLE = "お金の貸し借り💰";
var USER1 = PropertiesService.getScriptProperties().getProperty('AUTH_USER1');
var USER2 = PropertiesService.getScriptProperties().getProperty('AUTH_USER2');

function authorize () {
    var mail = Session.getActiveUser().getEmail();
    if (mail === USER1 || mail === USER2) return 1;
    return 0;
}

function doGet () {
    if (authorize()) {
        var template = HtmlService.createTemplateFromFile("index.html");
        template.MAPS_API_KEY = PropertiesService.getScriptProperties().getProperty("MAPS_API_KEY");
        return template.evaluate().setTitle(TITLE);
    }
}

function doFetchLastState () {
    return {
        users: dbFind("kvs", "users") || ["user1", "user2"],
        amountDiff: dbFind("kvs", "amountDiff") || 0,
    };
}

function doSaveUsernames (users) {
    dbSet("kvs", "users", users);
}
