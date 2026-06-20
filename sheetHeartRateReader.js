class SheetHeartRateReader {
  constructor() {
    this.heart_rate_with_time = new Queue();
    this.average_heart_rate = null;
    this.sheet = null;
    this.data = null;//スプレッドシートからそのまま出したデータ
    this.data_length = null;
  }

  get_heart_rate_with_time() {

    this.getData();

    const TimeIndex = 0
    const HeartRateIndex = 1

    for (let i = 1; i < this.data_length; i++) {
      this.push_heart_rate_with_time(this.data[i][TimeIndex], this.data[i][HeartRateIndex]);
    }

    Logger.log(this.heart_rate_with_time);
  }

  getData() {
    if (this.sheet === null) {
      throw new Error('シートが選択されていません');
    }else{
      this.data = this.sheet.getDataRange().getValues();
      this.data_length = this.data.length;
      Logger.log(this.data)
    }
  }

  push_heart_rate_with_time(time, heart_rate) {
    this.heart_rate_with_time.enqueue({ time: time, heart_rate: heart_rate });
  }

  shift_heart_rate_with_time() {
    this.heart_rate_with_time.dequeue();
  }

  getSheet(name = 'HeartRateData') {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    this.sheet = spreadsheet.getSheetByName(name);

    if (!this.sheet) {
      throw new Error('シートが見つかりません');
    }

    return this.sheet;
  }

  getLastData() {
    Logger.log(this.heart_rate_with_time.items[this.heart_rate_with_time.size() - 1])
    return this.heart_rate_with_time.items[this.heart_rate_with_time.size() - 1];
  }

  getAverageHeartRate() {

    if (this.heart_rate_with_time.size() > 1) {
      let sum = 0;
      const num_of_heart_rate= this.heart_rate_with_time.size();
      for(let i = 0;i < num_of_heart_rate;i++){
        sum += this.heart_rate_with_time.items[i].heart_rate;
      }
      this.average_heart_rate = sum / num_of_heart_rate;
      return this.average_heart_rate;
    } else {
      throw new Error('平均を出すためのデータがありません');
    }
  }
}
