function getRemoInfo(endpoint){
    const headers = {
      "Content-Type" : "application/json;",
      'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN
    };

    const options = {
      "method" : "get",
      "headers" : headers
    };

    const response = UrlFetchApp.fetch(REMO_DATA_URL + endpoint, options);
    const info = JSON.parse(response.getContentText());
    const formattedResponse = JSON.stringify(info, null, 2);
    Logger.log(formattedResponse);
    
    return info;
}


function remo_test1(){
  const device_infoes = getRemoInfo('appliances');

  const formattedResponse = JSON.stringify(device_infoes, null, 2);
  Logger.log(formattedResponse);
}

function remo_test2(){
  const deviceData = getRemoInfo('devices');

  const formattedResponse = JSON.stringify(deviceData, null, 2);
  Logger.log(formattedResponse)
}