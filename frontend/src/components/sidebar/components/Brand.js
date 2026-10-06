import React from "react";

// Chakra imports
import { Flex, useColorModeValue,Image } from "@chakra-ui/react";
import logo from "../../../assets/logo/solaranalyticsLogowide.png"
// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/*<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />*/}

        <Image src={logo}

        objectFit="cover"
        mb='10px'
      />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
