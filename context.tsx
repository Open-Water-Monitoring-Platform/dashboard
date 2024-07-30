'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface GlobalContextProps {
  devices: Device[];
  selectedDevice: Device | undefined;
  selectedDeviceData: SelectedDeviceData | undefined;
  tableData: WaterQuantityData[];
  graph: GraphData[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
  setSelectedDeviceData: React.Dispatch<React.SetStateAction<SelectedDeviceData | undefined>>;
  setTableData: React.Dispatch<React.SetStateAction<WaterQuantityData[]>>;
  setGraph: React.Dispatch<React.SetStateAction<GraphData[]>>;
  handleSelectChange: (selectedValue: string) => void;
  handleGraphChange: (type: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
  const [selectedDeviceData, setSelectedDeviceData] = useState<SelectedDeviceData | undefined>();
  const [tableData, setTableData] = useState<WaterQuantityData[]>([]);
  const [graph, setGraph] = useState<GraphData[]>([]);


  const handleSelectChange = (selectedValue: string) => {
    const selectedDevice = devices.find((device) => device.deviceId.toString() === selectedValue);

    if (selectedDevice) {
      setSelectedDevice(selectedDevice);
      localStorage.setItem("selectedDevice", selectedDevice.deviceId.toString());
    }
  };


  function handleGraphChange(type: string) {

  }

  async function fetchData() {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/device/all`);
      const { user_devices: allDevices } = res.data.data;
      const sortedDevices = allDevices.sort((a: Device, b: Device) => 
        Number(a.deviceId) - Number(b.deviceId)
      );

      setDevices(sortedDevices);

      const selectedDeviceId = localStorage.getItem("selectedDevice") || sortedDevices[0]?.deviceId;
      const device = sortedDevices.find((d: Device) => d.deviceId === selectedDeviceId) || sortedDevices[0];

      setSelectedDevice(device);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDeviceData() {
    try {
      if (selectedDevice) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/device/all/${selectedDevice.deviceId}`);
        const { history, ...newdata } = res.data.data;

        setSelectedDeviceData(newdata);
        setTableData(history);
        console.log("history", newdata);
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDeviceData();
  }, [selectedDevice]);

  return (
    <GlobalContext.Provider
      value={{
        devices,
        selectedDevice,
        selectedDeviceData,
        tableData,
        graph,
        setDevices,
        setSelectedDevice,
        setSelectedDeviceData,
        setTableData,
        setGraph,
        handleSelectChange,
        handleGraphChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
}