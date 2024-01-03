'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./_components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./_components/map";
import { WaterQualityData } from "@/utils/types";
import { Device, SelectedDeviceData } from "@/utils/types";

interface ParameterCardProps {
  title: string;
  value: string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ title, value }) => (
  <div>
    <h2 className="text-customGrey text-xs md:text-sm lg:text-base font-medium">{title}</h2>
    <h3 className="text-customBlue font-bold text-base md:text-xl lg:text-2xl">{value}</h3>
  </div>
);

const Home: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
  const [selectedDeviceData, setSelectedDeviceData] = useState<SelectedDeviceData | undefined>();
  const [tableData, setTableData] = useState<WaterQualityData[]>([]);

  async function fetchData() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/device/all`);
      const { user_devices: allDevices } = res.data.data;
      const sortedDevices = allDevices.sort((a: any, b: any) => a.deviceId - b.deviceId);

      setFetchedData(sortedDevices);

      const selectedDeviceId = localStorage.getItem("selectedDevice") || sortedDevices[0]?.deviceId;
      const device = sortedDevices.find((d: any) => d.deviceId === Number(selectedDeviceId)) || sortedDevices[0];

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

  const handleSelectChange = (selectedValue: string) => {
    const selectedDevice = fetchedData.find((device) => device.deviceId.toString() === selectedValue);

    if (selectedDevice) {
      setSelectedDevice(selectedDevice);
      localStorage.setItem("selectedDevice", selectedDevice.deviceId.toString());
    }
  };

  return (
    <main className="bg-[#F9F9F9] min-h-screen overflow-y-scroll px-4 md:px-8 lg:px-20 py-5">

      <div className="flex mt-[110px] md:mt-24 flex-row justify-between items-center">
        <span className="space-y-1 md:space-y-2 mb-4 md:mb-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">Dashboard</h2>
          {selectedDeviceData &&
            <h3 className="text-xs md:text-base">Last updated: {selectedDeviceData.date}, {selectedDeviceData.time}</h3>
          }
        </span>

        <span className="bg-white shadow-lg md:ml-4">
          <Select onValueChange={handleSelectChange} >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              {fetchedData.map(t => (
                <SelectItem value={`${t.deviceId}`}>{t.deviceId}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      </div>

      <div className="flex flex-col md:flex-row mt-4 md:mt-10 gap-4 md:gap-6">
        {selectedDeviceData &&
          <section className="flex-1 flex flex-col md:flex-row p-3 border rounded-lg bg-white">
            <div className="flex-1 px-1 md:py-4 gap-3 md:gap-5 flex flex-col justify-between">
              <ParameterCard title="Total Dissolved Solids (TDS)" value={`${selectedDeviceData.tds.toFixed(2)} ppm`} />
              <ParameterCard title="pH" value={`${selectedDeviceData.ph.toFixed(2)}`} />
              <ParameterCard title="Turbidity" value={`${selectedDeviceData.turbidity.toFixed(2)}`} />
              <ParameterCard title="Dissolved Oxygen (DO)" value={`- ppm`} />
            </div>
            <div className="flex-1 px-1 mt-3 md:mt-0 md:py-4 gap-3 md:gap-5 flex flex-col justify-between">
              <ParameterCard title="Electrical Conductivity" value={`${selectedDeviceData.ec} μS/cm`} />
              <ParameterCard title="Salinity" value={`${selectedDeviceData.salinity} ppt`} />
              <ParameterCard title="Resistivity" value={`${selectedDeviceData.resistivity} MΩ`} />
              <ParameterCard title="Temperature" value={`${selectedDeviceData.temperature.toFixed(2)} °C`} />
            </div>
            <div style={{ background: 'linear-gradient(180deg, #CCFFCE 0%, #F5F5F5 100%)' }} className="flex-1 border p-2 mt-4 md:mt-0 rounded-sm h-full">
              <h2 className="font-bold text-base md:text-lg lg:text-xl">Coming soon</h2>
            </div>
          </section>
        }

        <section className="flex-1 border rounded-lg bg-white mt-4 md:mt-0">
          {selectedDevice && selectedDevice.location.longitude &&
            <Map
              selectedDeviceLocation={[
                selectedDevice.location.longitude,
                selectedDevice.location.latitude,
              ]}
            />
          }
        </section>
      </div>

      <div className="mt-4 md:mt-10 bg-white p-4 md:p-5 shadow-xl rounded-md">
        <h2 className="font-bold text-xl my-4 md:my-5">History</h2>
        <DataTable data={tableData} />
      </div>
    </main>
  );
};

export default Home;
