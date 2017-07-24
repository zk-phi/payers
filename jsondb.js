/* internal functions */

function _makeKey () {
    var charId = "";
    for (var i = 1; i < 32 ; i++) {
        charId += String.fromCharCode(97 + Math.random() * 25);
    }
    return charId;
}

function _findKey (sheet, key, returnIndex /* optional */) {
    var values = sheet.getDataRange().getValues();
    for (var i = 0; i < values.length; i++) {
        if (values[i][0] === key) return returnIndex ? i : values[i][1];
    }
    return returnIndex ? -1 : null;
}

function _getAll (sheet) {
    var values = sheet.getDataRange().getValues();
    return values.filter(function (x) { return x[0] !== ""; }).map(function (x) {
        return { key: x[0], value: JSON.parse(x[1]) };
    });
}

function _getSheet (name) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

/* apis */

function dbSet (sheet, key, value) {
    var sheet = _getSheet(sheet);
    var index = _findKey(sheet, key, true);
    if (index < 0) sheet.appendRow([ key, JSON.stringify(value) ]);
    else sheet.getRange(index + 1, 2, 1, 1).setValues([[ JSON.stringify(value) ]]);
    return key;
}

function dbAppend (sheet, value) {
    var key = _makeKey();
    return dbSet(sheet, key, value);
}

function dbPrepend (sheet, value) {
    var key = _makeKey();
    var sheet = _getSheet(sheet);
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, 2).setValues([[ key, JSON.stringify(value) ]]);
    return key;
}

function dbFind (sheet, key) {
    var res = _findKey(_getSheet(sheet), key);
    return res ? JSON.parse(res) : null;
}

function dbDelete (sheet, key) {
    var sheet = _getSheet(sheet);
    var index = _findKey(sheet, key, true);
    if (index >= 0) sheet.deleteRow(index + 1);
    return key;
}

function dbSearch (sheet, filter /* optional */) {
    if (!filter) filter = function (x) { return true; };
    return _getAll(_getSheet(sheet)).filter(function (x) {
        return filter(x.value);
    });
}
