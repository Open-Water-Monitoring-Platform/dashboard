export interface Device {
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

export interface SelectedDeviceData {
    deviceId: number;
    flag: number;
    id: string;
    ph: number;
    phVoltage: number;
    tds: number;
    temperature: number;
    timestamp: number;
    turbidity: number;
    turbidityVoltage: number;
    resistivity: number;
    salinity: number;
    ec: number;
    date: string;
    time: string;
}


export type WaterQualityData = {
    date: string;
    time: string;
    tds: number;
    turbidity: number;
    ph: number;
    ec: number;
    temperature: number;
    summary: string;
};