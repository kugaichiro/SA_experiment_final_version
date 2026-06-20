class RemoSensorReader {
  constructor() {
    this.brightness = null;
    this.is_there_human = null;
  }

  updateRemoSensorData() {
    const deviceData = getRemoInfo('devices');

    this.brightness = deviceData[0].newest_events.il.val;
    this.is_there_human = deviceData[0].newest_events.mo.val;

    Logger.log("brightness: " + this.brightness + "  is there human: " + this.is_there_human);

    return {brightness: this.brightness, is_there_human: this.is_there_human};
  }
}

function remoSensor_test1(){
  const rsr = new RemoSensorReader();
  rsr.updateRemoSensorData();
}
