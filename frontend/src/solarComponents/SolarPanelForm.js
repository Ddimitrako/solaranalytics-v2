import React, { useState, useEffect ,useRef} from 'react';
import ShowInsightsForCoordinate from "./showInsightsForCoordinate";
import { Box,Button } from '@chakra-ui/react'
import { Input,InputGroup ,InputLeftAddon } from '@chakra-ui/react'
const GOOGLE_MAPS_API_KEY  =  process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const SolarPanelForm = ({map,props,storedbuildingInsights, setStoredbuildingInsights,setYearlyEnergyDcKwhNum}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputLatitudeValue, setInputLatitudeValue] = useState('');
  const [inputLongitudeValue, setInputLongitudeValue] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState(null);

  const [solarPanelPolygons, setSolarPanelPolygons] = useState([]);
  const solarPanelPolygonReferences = useRef(new Map());

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      // if (typeof window.google === 'undefined') {
      //   // Load Google Maps script
      // }
      const { Autocomplete } = await window.google.maps.places;
      const autocomplete = new Autocomplete(document.getElementById('autocomplete-input'), {
        fields: ['geometry'],
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => handlePlaceChange(autocomplete));
      setAutocomplete(autocomplete);
    };

    loadGoogleMapsScript();
    console.log(locationCoordinates)
  }, [locationCoordinates]);

   const handleCoordinateSubmit = async () => {
    if (!inputLatitudeValue || !inputLongitudeValue) {
      alert('Please enter both latitude and longitude.');
      return;
    }

    const latitude = parseFloat(inputLatitudeValue);
    const longitude = parseFloat(inputLongitudeValue);

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Invalid coordinates. Please enter valid numeric values.');
      return;
    }

    setLocationCoordinates({ latitude, longitude });

    await ShowInsightsForCoordinate(GOOGLE_MAPS_API_KEY, {
      latitude,
      longitude
    }, map, storedbuildingInsights, setStoredbuildingInsights, solarPanelPolygons, solarPanelPolygonReferences, props,
        setYearlyEnergyDcKwhNum);
    // Handle errors as needed
  };

  const handlePlaceChange = async (autocomplete) => {
    console.log("place selected")

    const place = autocomplete.getPlace();

    if (!place.geometry?.location) {
      alert("Something went wrong, can't resolve the location of this address!");
      return;
    }

    setLocationCoordinates({latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()})

    await ShowInsightsForCoordinate(GOOGLE_MAPS_API_KEY,{
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      },map,storedbuildingInsights,setStoredbuildingInsights,solarPanelPolygons,solarPanelPolygonReferences,
        props,setYearlyEnergyDcKwhNum)
        // .catch(error => {
        //   console.error(error)
        //
        //   if (error.message.includes("404"))
        //     alert("Sorry, there's no coverage available for this address!")
        //   else alert("Sorry, something went wrong!")
        // })


  };

    return (
        <div className="solar-panels-form active">
            <Box bg='blackAlpha.100' p={2}>
                <InputGroup>
                    <InputLeftAddon children='Address:' bg='blue.900' color='white'/>
                    <Input
                        id="autocomplete-input"
                        type="text"
                        className="solar-panels-form-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children='Latitude:' bg='blue.900' color='white'/>
                    <Input
                        id="Latitude-input"
                        type="text"
                        className="solar-panels-form-input-Latitude"
                        value={inputLatitudeValue}
                        onChange={(e) => setInputLatitudeValue(e.target.value)}
                    />
                    <InputLeftAddon children='Longitude:' bg='blue.900' color='white'/>
                    <Input
                        id="Longitude-input"
                        type="text"
                        className="solar-panels-form-input-Longitude"
                        value={inputLongitudeValue}
                        onChange={(e) => setInputLongitudeValue(e.target.value)}
                    />
                    <Box><Button size="sm" colorScheme='blue' onClick={handleCoordinateSubmit}>GO</Button></Box>

                </InputGroup>
            </Box>
        </div>
    );
};

export default SolarPanelForm;
