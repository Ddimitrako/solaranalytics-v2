import React, {useEffect, useState} from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  Icon,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import {FaSolarPanel, FaDollarSign, FaChartLine, FaBatteryFull, FaRegCalendarAlt, FaSlidersH} from 'react-icons/fa';
import {panelCountBasedOnCapacity}  from '../components/financialCalculations.js';
const FinancialAnalysis = ({panelsCount, yearlyEnergyDcKwhNum, analyticsData,panelCapacity,discountRate,installationCostPerKWH,
                             lifetimeProductionAcKwh,lifetimeEnergyConsumption}) => {
  // Dummy data to use in the component


  const [panelsCountBasedOnCapacity, setPanelsCountBasedOnCapacity] = useState(0);
  useEffect(() => {
    setPanelsCountBasedOnCapacity(panelCountBasedOnCapacity(panelsCount,panelCapacity))

  }, [yearlyEnergyDcKwhNum]);
  useEffect(() => {
    console.log("Panels Count Based on Capacity: ", panelsCountBasedOnCapacity.toFixed(0))
  }, [panelsCountBasedOnCapacity]);
  return (
    <VStack spacing={4} align="stretch">
      {/* Financial Benefits Section */}
      {/* Panels Count */}
      {/*<Box p={4} shadow="md" borderWidth="1px">*/}
      {/*  <Heading size="md">Panels Count</Heading>*/}
      {/*  <Slider aria-label="slider-ex-1" defaultValue={5}>*/}
      {/*    <SliderTrack>*/}
      {/*      <SliderFilledTrack />*/}
      {/*    </SliderTrack>*/}
      {/*    <SliderThumb boxSize={6}>*/}
      {/*      <Box color="blue.500" as={FaSlidersH} />*/}
      {/*    </SliderThumb>*/}
      {/*  </Slider>*/}
      {/*  <Text>{5} panels</Text>*/}
      {/*</Box>*/}
      <Box p={5} shadow="md" borderWidth="1px">
        <VStack align="stretch">
          <HStack>
            <Icon as={FaSolarPanel} />
            <Text fontSize="lg" fontWeight="bold">Financial Benefits</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Panels count</Text>
            <Text>{panelsCountBasedOnCapacity.toFixed(0)} panels</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Installation size</Text>
            <Text>{panelsCountBasedOnCapacity*panelCapacity}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Installation cost</Text>
            <Text>{panelsCountBasedOnCapacity*panelCapacity*installationCostPerKWH}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Energy covered</Text>
            <Text>{((lifetimeProductionAcKwh/lifetimeEnergyConsumption)*100).toFixed(2)} %</Text>
          </HStack>
        </VStack>
      </Box>




      {/* Savings Details Section */}
      <Box p={5} shadow="md" borderWidth="1px">
        <VStack align="stretch">
          <HStack justifyContent="space-between">
            <Icon as={FaDollarSign} />
            <Text>Cost without solar</Text>
            <Text>{analyticsData.costWithoutSolar}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Icon as={FaBatteryFull} />
            <Text>Cost with solar</Text>
            <Text>{analyticsData.costWithSolar}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Icon as={FaChartLine} />
            <Text>Savings</Text>
            <Text>{analyticsData.savings}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Icon as={FaRegCalendarAlt} />
            <Text>Break even</Text>
            <Text>{analyticsData.breakEven}</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default FinancialAnalysis;
