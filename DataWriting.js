function writeCurrentTime() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("HeartRateSheet hour"); // シート名
  var currentTime = Utilities.formatDate(new Date(), "GMT+9", "HHmm"); // 現在の時間をHHmm形式で取得
  sheet.getRange("A2").setValue(currentTime); // A2セルに現在の時間を書き込む
}


function getCellValue(sheetName, row, column) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); // シート名
  var cell = sheet.getRange(row, column); // セルの範囲
  var value = cell.getValue(); // セルの値を取得
  return value; // セルの値を返す
}

function writeheartrate(value) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("HeartRateSheet hour"); // シート名
  sheet.getRange("B2").setValue(value);
}



function fiveminutes() {
  dataupdate();
  writeCurrentTime();
  var value = getCellValue("heartrate_tmp", 1, 1);
  writeheartrate(value);
}


