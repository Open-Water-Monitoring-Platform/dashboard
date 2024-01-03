import { useEffect, useRef } from "react";
import { MapBox } from "@/mapbox.config";
import mapboxgl from "mapbox-gl";
import { IoLocationSharp } from "react-icons/io5";

type MapProps = {
  selectedDeviceLocation: mapboxgl.LngLatLike;
};

const Map: React.FC<MapProps> = ({ selectedDeviceLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = MapBox({
        //@ts-ignore
        ref: mapContainerRef.current,
        cords: selectedDeviceLocation,
      });

      // Create a marker
      marker.current = new mapboxgl.Marker().setLngLat(selectedDeviceLocation).addTo(map.current);
    }
  }, [selectedDeviceLocation]);

  useEffect(() => {
    if (map.current) {
      map.current.jumpTo({
        center: selectedDeviceLocation,
        zoom: 16, // starting zoom
      });

      // Update marker position
      if (marker.current) {
        marker.current.setLngLat(selectedDeviceLocation);
      }
    }
  }, [selectedDeviceLocation]);

  return (
    <div className="relative h-60 md:h-full w-full">
      <div ref={mapContainerRef} className="absolute h-60 md:h-full w-full "></div>
      <button
        className="absolute z-10 right-5 bottom-28 sm:bottom-[90%] bg-white/50 p-1 rounded-lg shadow backdrop-blur-md"
        onClick={() =>
          map.current?.flyTo({
            center: selectedDeviceLocation,
            zoom: 16, // starting zoom
            essential: true, // this is valid for flyTo, not jumpTo
          })
        }
      >
        <IoLocationSharp className="text-2xl" />
      </button>
    </div>
  );
};

export default Map;
