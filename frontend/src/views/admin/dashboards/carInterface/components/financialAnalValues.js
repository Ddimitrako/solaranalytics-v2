import React, {useEffect, useState} from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBuilding, FaLayerGroup, FaDollarSign, FaSun, FaSlidersH } from 'react-icons/fa';
import {lifetimeUtilityBill,lifetimeProductionAcKwhFunc,billCostModel,annualProduction,annualUtilityBillEstimate,lifetimeBillWithoutPV } from '../components/financialCalculations.js';
const FinancialAnalValues = ({panelsCount,
    storedbuildingInsights,
    yearlyEnergyDcKwhNum,
    setMonthlyEnergy,
    setMonthlyEnergyBill,
    // Add the new props here
    setEnergyCostPerKWh,
    setSolarIncentives,
    setPanelCapacity,
    setInstallationCostPerWatt,
    setLifetimeProductionAcKwh,
    dcToAcDerate,
    efficiencyDepreciationFactor,
    installationLifeSpan,
    lifetimeProductionAcKwh,
    setLifetimeUtilityBillVal,
    monthlyEnergyBill,
    costIncreaseFactor,
    discountRate,
    setLifetimeEnergyConsumption,
    monthlyEnergy,
    lifetimeUtilityBillVal,
    lifetimeEnergyConsumption,
    installationCostPerKWH,
   panelCapacity,
   solarIncentives,
   energyCostPerKWh

}) => {
   // Dummy data for the component
  const buildingInsights = {
    yearlyEnergy: '2.42 KWH',
    monthlySunshine: 'Monthly sunshine',
    savings: '$62,680.29 in 20 years',
    panelCount: 5,
    panelCapacity: '250',
  };
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });


  const handleMonthlyEnergyChange = (e) => {
    setMonthlyEnergy(e.target.value);
  };
  const handleMonthlyEnergyBillChange = (e) => {
    setMonthlyEnergyBill(e.target.value);
  };
  const handleEnergyCostPerKWh = (e) => {
    setEnergyCostPerKWh(e.target.value);
  };
  const handleSolarIncentives = (e) => {
    setSolarIncentives(e.target.value);
  };
  const handlePanelCapacity = (e) => {
    setPanelCapacity(e.target.value);
  };
   const handleInstallationCostPerKWH = (e) => {
    setInstallationCostPerWatt(e.target.value);
  };

  useEffect(() => {
    if ( yearlyEnergyDcKwhNum!==0 && panelsCount){
      console.log("panelsCount:",panelsCount)
      console.log("Energy:",yearlyEnergyDcKwhNum)
      setLifetimeProductionAcKwh( lifetimeProductionAcKwhFunc(dcToAcDerate, yearlyEnergyDcKwhNum, efficiencyDepreciationFactor, installationLifeSpan))
      console.log("lifetimeProductionAcKwh",lifetimeProductionAcKwh)

      setLifetimeUtilityBillVal(lifetimeBillWithoutPV(monthlyEnergyBill,costIncreaseFactor,discountRate,installationLifeSpan))
      console.log("lifetime Utility Bill for "+installationLifeSpan+" years:" +lifetimeUtilityBillVal+" Euros")
      setLifetimeEnergyConsumption( monthlyEnergy*12*installationLifeSpan)

      console.log("lifetime Energy spend for "+installationLifeSpan + " without PV"+ lifetimeEnergyConsumption)
    }
  }, [yearlyEnergyDcKwhNum,panelsCount]);

  return (
    <VStack spacing={4} align="stretch">
      {/* Search and Building Insights */}
      <Box p={4} shadow="md" borderWidth="1px">
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4}>
            <Heading size="md">Building Insights</Heading>
            <Text>Annual energy: {yearlyEnergyDcKwhNum ? yearlyEnergyDcKwhNum : 1000} kWh</Text>

          </Box>
        </Collapse>
      </Box>



      {/* Financial Benefits */}
      <Box p={4} shadow="sm" borderWidth="1px">
        {/*<Heading size="md">Financial Benefits</Heading>*/}
        {/*<Text>{buildingInsights.savings}</Text>*/}
         <Heading size="sm">Lifetime Production AC </Heading>
        <Text>{lifetimeProductionAcKwh.toFixed(2)} kWh</Text>

        <Heading size="sm">Lifetime Utility Bill without PV in {installationLifeSpan} years</Heading>
        <Text>{lifetimeUtilityBillVal.toFixed(2)} Euros</Text>

        <Heading size="sm">Lifetime Utility Energy consumption in {installationLifeSpan} years</Heading>
        <Text>{lifetimeEnergyConsumption.toFixed(2)} kWh</Text>

        <Box> <Text>Monthly average energy bill</Text></Box>
        <InputGroup>
          <InputLeftAddon children={<FaDollarSign />} />
          <Input
              placeholder="Monthly average energy bill"
              value={monthlyEnergyBill}
              onChange={handleMonthlyEnergyBillChange}
          />
        </InputGroup>
        <center><div>or</div></center>
        <Box> <Text>Monthly average energy consumption in kWh</Text></Box>
        <InputGroup>
          <InputLeftAddon  />
          <Input
              placeholder="Monthly average energy bill"
              value={monthlyEnergy}
              onChange={handleMonthlyEnergyChange}
          />
        </InputGroup>
        <Box> <Text>Energy cost per kWh</Text></Box>
        <InputGroup>
          <InputLeftAddon children={<FaDollarSign />} />
          <Input
              placeholder="Energy cost per kWh"
              value={energyCostPerKWh}
              onChange={handleEnergyCostPerKWh}
          />
        </InputGroup>
        <Box> <Text>Solar incentives</Text></Box>
        <InputGroup>
          <InputLeftAddon children={<FaSun />} />
          <Input
              placeholder="Solar incentives"
              value={solarIncentives}
              onChange={handleSolarIncentives}
          />
        </InputGroup>
         <Box> <Text>Panel capacity</Text></Box>
        <InputGroup>
          <InputLeftAddon children="Watts" />
          <Input
              placeholder="Panel capacity"
              value={panelCapacity}
              onChange={handlePanelCapacity}
          />
        </InputGroup>
        <Box> <Text>Installation cost per KWH</Text></Box>
        <InputGroup>
          <InputLeftAddon children={<FaDollarSign />} />
          <Input
              placeholder="Installation cost per kWh"
              value={installationCostPerKWH}
              onChange={handleInstallationCostPerKWH}
          />
        </InputGroup>
      </Box>




    </VStack>
  );
};

export default FinancialAnalValues;
