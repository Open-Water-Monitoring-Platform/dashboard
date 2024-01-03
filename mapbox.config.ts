import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import React, { Ref } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
type MapBoxType = {
  ref: HTMLDivElement;
  cords: mapboxgl.LngLatLike;
};
export const MapBox = ({ ref, cords }: MapBoxType): mapboxgl.Map => {
  //@ts-ignore
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const map = new mapboxgl.Map({
    container: ref, // container ID
    style: "mapbox://styles/msanket9/ckzs50p74000r14rzcq36h7ia", // style URL
    center: cords,
    // pitch: 60, // pitch in degrees
    // bearing: 0, // bearing in degrees
    zoom: 16, // starting zoom
    // minZoom: 3.5,
    // maxZoom: 500,
  });
  return map; 
};
