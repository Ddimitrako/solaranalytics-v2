import React, { useEffect, useRef, useState } from 'react';
import SolarPanelForm from './SolarPanelForm'; // Import SolarPanelForm component
import {Stack, HStack, VStack, Heading, Text, Progress} from '@chakra-ui/react'
import BuildingAnalytics from "./buildingAnalytics";
import {Box, Grid, Icon, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";
import Card from "../components/card/Card";
import {FaChild, FaFan} from "react-icons/fa";
import {MdLibraryMusic, MdLiveTv, MdLock, MdOutlineWbSunny, MdPhoneInTalk} from "react-icons/md";
import FinancialAnalValues from "../views/admin/dashboards/carInterface/components/financialAnalValues";
import FinancialAnalysis from "../views/admin/dashboards/carInterface/components/financialAnalysis";
import {AnalysisContext} from "../contexts/Contexts";
import InsightsParent from "../views/admin/dashboards/carInterface/components/InsightsParent";
const SolarPanelsMap = () => {
  const mapRef = useRef(null);
  const sliderRef = useRef(null);
  const annualEnergyRef = useRef(null);
  const [map, setMap] = useState(null); // State to store the map object
  const [props, setProps] = useState(null);
  const [storedbuildingInsights, setStoredbuildingInsights] = useState();
  const [panelsCount,setPanelsCount]= useState(0)
  const [annualEnergy,setAnnualEnergy] = useState(0)
  const [yearlyEnergyDcKwhNum,setYearlyEnergyDcKwhNum] = useState(0)

  const initMap = async () => {
    const mapElement = document.createElement('div');
    mapElement.className = 'solar-panels-map';
    mapElement.style.height = '100%'; // Ensure the map fills the container


    const panelElement = document.createElement("div")
    const panelSliderElement = document.createElement("input")
    const panelCountConicInnerElement = document.createElement("div")
    const panelCountConicElement = document.createElement("div")
    const panelEnergyConicInnerElement = document.createElement("div")
    const panelEnergyConicElement = document.createElement("div")
    const element = document.getElementById("solar-panels");


    const dataContainer = document.createElement("div")
    dataContainer.className = "solar-panels-panel solar-panels-panel-data"
    panelElement.append(dataContainer)

    const panelsCountContainer = document.createElement("div")
    panelsCountContainer.className = "solar-panels-panel-container"
    dataContainer.append(panelsCountContainer)
    const panelsCountTitle = document.createElement("h3")
    panelsCountTitle.className = "solar-panels-panel-title"
    panelsCountTitle.innerText = "Panels count"
    panelsCountContainer.append(panelsCountTitle)


    panelCountConicElement.className = "solar-panels-panel-conic"
    panelCountConicElement.style.color = "blue"
    // panelCountConicElement.style.backgroundColor = "grey"
    panelCountConicElement.style.setProperty("--progress", "50%")
    panelsCountContainer.append(panelCountConicElement)
    sliderRef.current.appendChild(panelsCountContainer);

    panelCountConicInnerElement.className =
      "solar-panels-panel-conic-inner"
    panelCountConicInnerElement.innerText = "50"
    panelCountConicElement.append(panelCountConicInnerElement)

    const annualEnergyContainer = document.createElement("div")
    annualEnergyContainer.className = "solar-panels-panel-container"
    dataContainer.append(annualEnergyContainer)

    const annualEnergyTitle = document.createElement("h3")
    annualEnergyTitle.className = "annual-energy-title"
    annualEnergyTitle.innerText = "Annual energy in kWh"
    annualEnergyContainer.append(annualEnergyTitle)


    panelEnergyConicElement.className = "solar-panels-panel-conic"
    panelEnergyConicElement.style.color = "green"
    panelEnergyConicElement.style.setProperty("--progress", "25%")
    annualEnergyContainer.append(panelEnergyConicElement)
    // sliderRef.current.appendChild(annualEnergyContainer);
    annualEnergyRef.current.appendChild(annualEnergyContainer);

    panelEnergyConicInnerElement.className =
      "solar-panels-panel-conic-inner"
    panelEnergyConicInnerElement.innerText = "1000"
    panelEnergyConicElement.append(panelEnergyConicInnerElement)

    const sliderContainer = document.createElement("div")
    sliderContainer.className = "solar-panels-panel"
    panelElement.append(sliderContainer)


    panelSliderElement.className = "solar-panels-panel-slider"
    panelSliderElement.type = "range"
    panelSliderElement.min = "0"
    panelSliderElement.value = "0"
    panelSliderElement.step = "1"
    sliderContainer.append(panelSliderElement)
    sliderRef.current.appendChild(sliderContainer);

    setProps({
      panelElement: panelElement,
      panelSliderElement: panelSliderElement,
      panelCountConicInnerElement: panelCountConicInnerElement,
      panelCountConicElement: panelCountConicElement,
      panelEnergyConicInnerElement: panelEnergyConicInnerElement,
      panelEnergyConicElement: panelEnergyConicElement,
      element: element,
      dataContainer: dataContainer,
      panelsCountContainer: panelsCountContainer,
      panelsCountTitle: panelsCountTitle,
      annualEnergyContainer: annualEnergyContainer,
      annualEnergyTitle: annualEnergyTitle,
      sliderContainer: sliderContainer,
    });

    const handleSliderChange = (event) => {
      const newValue = Number(event.target.value) + 4;
      setPanelsCount(newValue);
      console.log(newValue); // Logs the current value
    };

    panelSliderElement.addEventListener('change', handleSliderChange)




    if (mapRef.current) {
      mapRef.current.appendChild(mapElement);

      const initializedMap = new window.google.maps.Map(mapElement, {
        center: {
          lat: 57.623147493770105,
          lng: 11.931981013011718,
        },
        mapTypeId: 'satellite',
        tilt: 0,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        zoom: 17,
        streetViewControl: false,
        mapTypeControl: false,
        rotateControl: false,
      });

      setMap(initializedMap); // Store the initialized map in state
    }
  };


  useEffect(() => {
    initMap();

    // Add a click event listener to the map


  }, []);
  useEffect(() => {
    if (map) {
      // Add a click event listener to the map
      const clickListener = map.addListener('click', (mapsMouseEvent) => {
        // Get the coordinates of the clicked location
        const clickedLatLng = mapsMouseEvent.latLng;
        const lat = clickedLatLng.lat();
        const lng = clickedLatLng.lng();

        // Use or display the coordinates
        console.log(`Clicked location: Latitude: ${lat}, Longitude: ${lng}`);
      });

      return () => {
        // Remove the listener on cleanup
        window.google.maps.event.removeListener(clickListener);
      };
    }
  }, [map]); // This useEffect runs when the 'map' state changes
  useEffect(() => {
   console.log("Main Debugger:",storedbuildingInsights)

    // Add a click event listener to the map


  }, [storedbuildingInsights]);

  return (

        <div style={{position: 'relative'}}>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              {map && <SolarPanelForm map={map} props={props} storedbuildingInsights={storedbuildingInsights}
                                      setStoredbuildingInsights={setStoredbuildingInsights}
                                      setYearlyEnergyDcKwhNum={setYearlyEnergyDcKwhNum}/>}
              <div ref={mapRef} style={{height: '500px', width: '100%'}}/>
              <Box>
                {storedbuildingInsights !== undefined && <BuildingAnalytics insights={storedbuildingInsights}/>}
              </Box>
            </Box>
            <Box>
              <InsightsParent storedbuildingInsights={storedbuildingInsights} yearlyEnergyDcKwhNum={yearlyEnergyDcKwhNum} panelsCount={panelsCount} sliderRef={sliderRef} annualEnergyRef={annualEnergyRef} />

            </Box>

        </SimpleGrid>


  </div>

);

};

export default SolarPanelsMap;
