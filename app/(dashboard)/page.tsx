'use client'
import DataGraph from "./_components/data-graph";
import { useGlobalContext } from "@/context";
import { DataTable } from "./_components/table";

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
  const { selectedDeviceData, graph, handleGraphChange, tableData } = useGlobalContext()

  return (
    <main className="bg-[#F9F9F9] min-h-screen overflow-y-scroll px-4 md:px-8 lg:px-20 py-5">

      <div className="flex mt-[110px] md:mt-24 flex-row justify-between items-center">
        <span className="space-y-1 md:space-y-2 mb-4 md:mb-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">Dashboard</h2>
          {selectedDeviceData &&
            <h3 className="text-xs md:text-base">Last updated: {selectedDeviceData.date}, {selectedDeviceData.time}</h3>
          }
        </span>
      </div>

      <div className="flex flex-col md:flex-row mt-4 md:mt-10 gap-4 md:gap-6">
        {selectedDeviceData &&
          <section className="flex-1 flex flex-col md:flex-row p-3 border rounded-lg bg-white">
            <div className="flex-1 px-1 md:py-4 gap-3 md:gap-5 flex flex-col justify-between">
              <ParameterCard title="Total Dissolved Solids (TDS)" value={`${selectedDeviceData.tds.toFixed(2)} ppm`} />
              <ParameterCard title="pH" value={`${selectedDeviceData.ph.toFixed(2)}`} />
              <ParameterCard title="Turbidity" value={`${selectedDeviceData.turbidity.toFixed(2)} NTU`} />
              <ParameterCard title="Oxidation Reduction Potential (ORP)" value={`${selectedDeviceData.orp.toFixed(2)} ppm`} />
            </div>
            <div className="flex-1 px-1 mt-3 md:mt-0 md:py-4 gap-3 md:gap-5 flex flex-col justify-between">
              <ParameterCard title="Electrical Conductivity" value={`${selectedDeviceData.ec} μS/cm`} />
              <ParameterCard title="Salinity" value={`${selectedDeviceData.salinity} ppt`} />
              <ParameterCard title="Dissolved Oxygen (DO)" value={`${selectedDeviceData.do.toFixed(2)} ppm`} />
              <ParameterCard title="Temperature" value={`${selectedDeviceData.temperature.toFixed(2)} °C`} />
            </div>
          </section>
        }

        <section className="flex-1 border rounded-lg bg-white mt-4 md:mt-0">
        <DataGraph graph={graph} handleGraphChange={handleGraphChange} />
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
