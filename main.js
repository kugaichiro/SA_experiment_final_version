function Main(){ //5分毎に実行する関数

  const sheet_reader = new SheetHeartRateReader();
  const average_sheet_reader = new SheetHeartRateReader();

  sheet_reader.getSheet('HeartRateSheet hour');
  sheet_reader.get_heart_rate_with_time();

  average_sheet_reader.getSheet('HeartRateAvarageSheet day');
  average_sheet_reader.get_heart_rate_with_time();


  updateAverageSheetOnThehour(sheet_reader, average_sheet_reader);

  const average_heart_rate_day = average_sheet_reader.getAverageHeartRate();
  const heart_rate_threshold_sleeping = 0.8 * average_heart_rate_day  //寝ているかどうかの閾値
  Logger.log("heart rate threshold sleeping: " + heart_rate_threshold_sleeping)
  light_offWhenAsleep(heart_rate_threshold_sleeping, sheet_reader);

  night_light_onWhenNighttimeAwaking(heart_rate_threshold_sleeping, sheet_reader);
}


function updateAverageSheetOnThehour(sheet_reader, average_sheet_reader){
  const now_time = parseInt(sheet_reader.getLastData().time);
  const now_hour = now_time / 100 | 0;
  const now_minute = now_time % 100;
  if(55 <= now_minute && now_minute < 60){
    if(average_sheet_reader.heart_rate_with_time.size() < 16)
      average_sheet_reader.push_heart_rate_with_time(now_hour, sheet_reader.getAverageHeartRate());
    else{
      average_sheet_reader.shift_heart_rate_with_time();
      average_sheet_reader.push_heart_rate_with_time(now_hour, sheet_reader.getAverageHeartRate());
    }
    updateSheet(average_sheet_reader, average_sheet_reader.heart_rate_with_time);
  }
}

function light_offWhenAsleep(heart_rate_threshold_sleeping, sheet_reader){
  if(sheet_reader.getLastData().heart_rate < heart_rate_threshold_sleeping){      //寝ていることを検知したとき
    const remo_light_operation = new RemoLightOperation();
    remo_light_operation.search_signalId();
    remo_light_operation.light_off();
  }
}

function night_light_onWhenNighttimeAwaking(heart_rate_threshold_sleeping, sheet_reader){
  const remo_sensor_reader = new RemoSensorReader();
  if(sheet_reader.getLastData().heart_rate > heart_rate_threshold_sleeping &&
      sheet_reader.getAverageHeartRate() < heart_rate_threshold_sleeping &&
      remo_sensor_reader.updateRemoSensorData().brightness < 20){   //寝ている最中に途中で起きたとき

    const remo_light_operation = new RemoLightOperation();
    remo_light_operation.search_signalId();
    remo_light_operation.night_light_on();
  }
}

