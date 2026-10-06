// Chakra imports
import {
  Box,
  Grid,
  Icon,
  Flex,
  Text,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useColorModeValue, HStack,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { FaChild, FaFan } from "react-icons/fa";
import { ButtonLeft, ButtonRight } from "components/icons/Icons";
// Assets
import {
  MdLibraryMusic,
  MdLiveTv,
  MdLock,
  MdOutlineWbSunny,
  MdPhoneInTalk,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";


import SolarPanelMap from "../../../../solarComponents/map";
import SolarPanelForm from "../../../../solarComponents/SolarPanelForm";
import FinancialAnalysis from "./components/financialAnalysis";
import FinancialAnalValues from "./components/financialAnalValues";
export default function Default() {
  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const brandBg = useColorModeValue("white", "navy.800");

  return (

      <div>
        <SolarPanelMap/>
      </div>


  );
}
