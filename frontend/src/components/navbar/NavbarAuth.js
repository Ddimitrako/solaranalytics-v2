import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";

// Assets
import dropdownMain from "assets/img/layout/dropdownMain.png";
import dropdown from "assets/img/layout/dropdown.png";
import { GoChevronDown } from "react-icons/go";
import routes from "routes.js";

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();
  // Menu States
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  const {
    isOpen: isOpenMain,
    onOpen: onOpenMain,
    onClose: onCloseMain,
  } = useDisclosure();
  const {
    isOpen: isOpenNft,
    onOpen: onOpenNft,
    onClose: onCloseNft,
  } = useDisclosure();
  // Menus
  function getLinks(routeName) {
    let foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    console.log(foundRoute);
    return foundRoute[0].items;
  }

  let logoColor = useColorModeValue("white", "white");
  // Chakra color mode

  const textColor = useColorModeValue("navy.700", "white");
  let menuBg = useColorModeValue("white", "navy.900");
  let mainText = "#fff";
  let navbarBg = "none";
  let navbarShadow = "initial";
  let bgButton = "white";
  let colorButton = "brand.500";
  let navbarPosition = "absolute";

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Stack direction='row' spacing='12px' align='center' justify='center'>
        <HorizonLogo h='26px' w='175px' color={logoColor} />
      </Stack>
      <Text fontsize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW='175px'
        href={`${process.env.PUBLIC_URL}/#/`}
        target='_blank'
        display='flex'
        lineHeight='100%'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        color={mainText}>
        {/*<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
      </Link>
    );

  }
  const createNftsLinks = (routes) => {
    return routes.map((link, key) => {
      return (
        <NavLink
          key={key}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='500'>
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  // const createDashboardsLinks = (routes) => {
  //   return routes.map((link, key) => {
  //     return (
  //       <NavLink
  //         key={key}
  //         to={link.layout + link.path}
  //         style={{ maxWidth: "max-content" }}>
  //         <Text color='gray.400' fontSize='sm' fontWeight='500'>
  //           {link.name}
  //         </Text>
  //       </NavLink>
  //     );
  //   });
  // };
  // const createMainLinks = (routes) => {
  //   return routes.map((link, key) => {
  //     if (link.collapse === true) {
  //       return (
  //         <Stack key={key} direction='column' maxW='max-content'>
  //           <Stack
  //             direction='row'
  //             spacing='0px'
  //             align='center'
  //             cursor='default'>
  //             <Text
  //               textTransform='uppercase'
  //               fontWeight='bold'
  //               fontSize='sm'
  //               me='auto'
  //               color={textColor}>
  //               {link.name}
  //             </Text>
  //           </Stack>
  //           <Stack direction='column' bg={menuBg}>
  //             {/*{createMainLinks(link.items)}*/}
  //           </Stack>
  //         </Stack>
  //       );
  //     } else {
  //       return (
  //         <NavLink key={key} to={link.layout + link.path}>
  //           <Text color='gray.400' fontSize='sm' fontWeight='normal'>
  //             {link.name}
  //           </Text>
  //         </NavLink>
  //       );
  //     }
  //   });
  // };
  // const createAuthLinks = (routes) => {
  //   return routes.map((link, key) => {
  //     if (link.collapse === true) {
  //       return (
  //         <Stack key={key} direction='column' maxW='max-content'>
  //           <Stack
  //             direction='row'
  //             spacing='0px'
  //             align='center'
  //             cursor='default'>
  //             <Text
  //               textTransform='uppercase'
  //               fontWeight='bold'
  //               fontSize='sm'
  //               me='auto'
  //               color={textColor}>
  //               {link.name}
  //             </Text>
  //           </Stack>
  //           <Stack direction='column' bg={menuBg}>
  //             {createAuthLinks(link.items)}
  //           </Stack>
  //         </Stack>
  //       );
  //     } else {
  //       return (
  //         <NavLink key={key} to={link.layout + link.path}>
  //           <Text color='gray.400' fontSize='sm' fontWeight='normal'>
  //             {link.name}
  //           </Text>
  //         </NavLink>
  //       );
  //     }
  //   });
  // };


  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      {brand}
      {/*<Flex*/}
      {/*  position={navbarPosition}*/}
      {/*  top='16px'*/}
      {/*  left='50%'*/}
      {/*  transform='translate(-50%, 0px)'*/}
      {/*  background={navbarBg}*/}
      {/*  boxShadow={navbarShadow}*/}
      {/*  borderRadius='15px'*/}
      {/*  px='16px'*/}
      {/*  py='22px'*/}
      {/*  mx='auto'*/}
      {/*  width='1044px'*/}
      {/*  maxW='90%'*/}
      {/*  alignItems='center'*/}
      {/*  zIndex='3'>*/}
      {/*  <Flex w='100%' >*/}

          {/*<Box*/}
          {/*  ms={{ base: "auto", lg: "0px" }}*/}
          {/*  display={{ base: "flex", lg: "none" }}*/}
          {/*  justifyContent='center'*/}
          {/*  alignItems='center'>*/}
          {/*  <SidebarResponsive*/}
          {/*    logo={*/}
          {/*      <Stack*/}
          {/*        direction='row'*/}
          {/*        spacing='12px'*/}
          {/*        align='center'*/}
          {/*        justify='center'>*/}
          {/*        <Box*/}
          {/*          w='1px'*/}
          {/*          h='20px'*/}
          {/*          bg={colorMode === "dark" ? "white" : "gray.700"}*/}
          {/*        />*/}
          {/*      </Stack>*/}
          {/*    }*/}
          {/*    logoText={props.logoText}*/}
          {/*    secondary={props.secondary}*/}
          {/*    routes={routes}*/}
          {/*    {...rest}*/}
          {/*  />*/}
          {/*</Box>*/}

        {/*</Flex>*/}
      {/*</Flex>*/}
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
