class RemoLightOperation {
  constructor() {
    this.light_infoes = [];
    this.light_switch_id = null;
    this.night_light_id = null;
    this.number = 0 //もし照明が複数あったときにどの照明を操作するかを判断するためのnumber
  };

  //この関数は操作する家電を探すためにその家電のIDが必要なためにIDを探す
  search_signalId(){  

    this.getLightInfo_InRemoInfo();

    if(this.number < 0 || this.light_infoes.length <= this.number)
      return;
    
    const signals = this.light_infoes[this.number].signals;
    this.light_switch_id = null;
    this.night_light_id = null;
    
    for(let i = 0;i < signals.length;i++){
      if(signals[i].name == 'switch'){
        this.light_switch_id = signals[i].id;
      }else if(signals[i].name == 'night light'){
        this.night_light_id = signals[i].id;
      }
      
      if(this.light_switch_id && this.night_light_id)
        break;
    }
    if(!(this.light_switch_id && this.night_light_id))
      throw new Error('switchもしくはnight lightのボタンが認識されません')

    Logger.log("light_switch_id : " + this.light_switch_id + " night_light_id : " + this.night_light_id);
  };

  //Remoに登録されている家電のデータの一覧の中から照明のデータだけ取り出す
  getLightInfo_InRemoInfo() {
    const device_infoes = getRemoInfo('appliances');

    this.light_infoes = []
    for(let i = 0;i < device_infoes.length;i++){
      if(device_infoes[i].image == 'ico_light'){  //照明のデータかを判断するためにそのデータのアイコンの名前を確認
        this.light_infoes.push(device_infoes[i])
      }
    }
    const formattedResponse = JSON.stringify(this.light_infoes, null, 2);
    Logger.log(formattedResponse);

    return this.light_infoes;
  }


  //ここから下は家電を操作する関数
  light_off(){
    let url = REMO_OPERATION_URL + this.night_light_id + "/send";
    const options = {
      "method" : "post",
      "headers" : {"Authorization" : "Bearer " + REMO_ACCESS_TOKEN}
    };
    let reply = UrlFetchApp.fetch(url, options); //照明の状態がわからないので最初に常夜灯をつけることで強制的に状態をオンにする

    url = REMO_OPERATION_URL + this.light_switch_id + "/send";
    
    reply = UrlFetchApp.fetch(url, options);
  };

  night_light_on(){
    let url = REMO_OPERATION_URL + this.night_light_id + "/send";
    const options = {
      "method" : "post",
      "headers" : {"Authorization" : "Bearer " + REMO_ACCESS_TOKEN}
    };
    let reply = UrlFetchApp.fetch(url, options);
  }
}

function remolightOperation_test1(){
  const rlo = new RemoLightOperation();

  rlo.search_signalId();
  rlo.light_off();
}
