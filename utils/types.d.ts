interface Device {
    default: boolean;
    deviceId: number;
    device_enabled: boolean;
    docId: string;
    enabled: boolean;
    location: {
        address: string;
        elevation: string;
        latitude: number;
        longitude: number;
    };
    sharing: boolean;
    type: string;
    userId: string;
}

interface SelectedDeviceData {
    deviceId: number;
    flag: number;
    id: string;
    ph: number;
    phVoltage: number;
    tds: number;
    temperature: number;
    timestamp: number;
    turbidity: number;
    salinity: number;
    do: number;
    orp: number;
    ec: number;
    date: string;
    time: string;
}


type WaterQuantityData = {
    date: string;
    time: string;
    fr: number;
    cv: number;
    depth: number;
};

interface GraphData {
    date: string;
    value: number;
  }