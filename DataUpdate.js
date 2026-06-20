function moveValuesDownA() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeartRateSheet hour");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:A" + lastRow);
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    var value = values[i][0];
    if (typeof value === "number") { // 数値データのみ移動
      var nextCell = sheet.getRange(i + 2, 1); // 次のセル
      nextCell.setValue(value); // 数値を次のセルに移動
    }
  }
}

function moveValuesDownB() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeartRateSheet hour");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("B1:B" + lastRow);
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    var value = values[i][0];
    if (typeof value === "number") { // 数値データのみ移動
      var nextCell = sheet.getRange(i + 2, 2); // 次のセル
      nextCell.setValue(value); // 数値を次のセルに移動
    }
  }
}



function clearRowValues() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeartRateSheet hour"); // シート名
  var rowToClear = 14; // クリアしたい行の番号
  var numColumns = sheet.getLastColumn();
  
  // 行の各セルをクリア
  for (var i = 1; i <= numColumns; i++) {
    var cell = sheet.getRange(rowToClear, i);
    cell.clear();
}
}


function dataupdate(){
  moveValuesDownA();
  moveValuesDownB();
  clearRowValues();
}
