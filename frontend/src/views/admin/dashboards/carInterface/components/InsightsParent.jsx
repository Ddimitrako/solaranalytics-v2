import React, { createContext, useContext, useState } from 'react';
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
    SliderFilledTrack, SliderThumb, useColorModeValue, SimpleGrid
} from '@chakra-ui/react';
import FinancialAnalValues from "./financialAnalValues";
import FinancialAnalysis from "./financialAnalysis";


const FinancialDataContext = createContext();

export default function InsightsParent({panelsCount,storedbuildingInsights,yearlyEnergyDcKwhNum,sliderRef,annualEnergyRef}) {

  const buildingInsights = {
    yearlyEnergy: '2.42 KWH',
    monthlySunshine: 'Monthly sunshine',
    savings: '$62,680.29 in 20 years',
    panelCount: 5,
    panelCapacity: '250',
  };
  const analyticsData = {
    panelCount: 5,
    installationSize: '1.25 kWh',
    installationCost: '$00.00',
    energyCovered: '114%',
    costWithoutSolar: '$61,305.29',
    costWithSolar: '-$1,375.00',
    savings: '$62,680.22',
    breakEven: '0 years'
  };
  const [monthlyEnergyBill, setMonthlyEnergyBill] = useState(26.1);
  const [monthlyEnergy, setMonthlyEnergy] = useState(150);
  const [energyCostPerKWh, setEnergyCostPerKWh] = useState(0.174);
  const [solarIncentives, setSolarIncentives] = useState(0);
  const [panelCapacity, setPanelCapacity] = useState(buildingInsights.panelCapacity);
  const [installationCostPerKWH, setInstallationCostPerWatt] = useState(1.4);
  const [dcToAcDerate, setdcToAcDerate] = useState(0.85);
  const [efficiencyDepreciationFactor, setefficiencyDepreciationFactor] = useState(0.996);
  const [installationLifeSpan,setInstallationLifeSpan]= useState(20);
  const [lifetimeProductionAcKwh, setLifetimeProductionAcKwh] = useState(0 );
  const [annualUtilityBillVal,setAnnualUtilityBillVal ] = useState(0 );
  const [lifetimeUtilityBillVal, setLifetimeUtilityBillVal] = useState(0 );
  const [costIncreaseFactor, setCostIncreaseFactor] = useState( 1.022  );
  const [discountRate, setDiscountRate] = useState( 1.04 );
  const [lifetimeEnergyConsumption, setLifetimeEnergyConsumption] = useState( 0 );
  const [annualEnergyConsumption, setAnnualEnergyConsumption] = useState( 0 );
  return (

      <SimpleGrid columns={3} spacing={5}>

                <Box>
                  <div ref={sliderRef}></div>
                  <Box>
                    <FinancialAnalValues panelsCount={panelsCount}
                storedbuildingInsights={storedbuildingInsights}
                yearlyEnergyDcKwhNum={yearlyEnergyDcKwhNum}
                setMonthlyEnergy={setMonthlyEnergy}
                setMonthlyEnergyBill={setMonthlyEnergyBill}
                setEnergyCostPerKWh={setEnergyCostPerKWh}
                setSolarIncentives={setSolarIncentives}
                setPanelCapacity={setPanelCapacity}
                setInstallationCostPerWatt={setInstallationCostPerWatt}
                setLifetimeProductionAcKwh={setLifetimeProductionAcKwh}
                dcToAcDerate={dcToAcDerate}
                efficiencyDepreciationFactor={efficiencyDepreciationFactor}
                installationLifeSpan={installationLifeSpan}
                lifetimeProductionAcKwh={lifetimeProductionAcKwh}
                setLifetimeUtilityBillVal={setLifetimeUtilityBillVal}
                monthlyEnergyBill={monthlyEnergyBill}
                costIncreaseFactor={costIncreaseFactor}
                discountRate={discountRate}
                setLifetimeEnergyConsumption={setLifetimeEnergyConsumption}
                monthlyEnergy={monthlyEnergy}
                lifetimeUtilityBillVal={lifetimeUtilityBillVal}
                lifetimeEnergyConsumption={lifetimeEnergyConsumption}
                installationCostPerKWH={installationCostPerKWH}
                panelCapacity={panelCapacity}
                solarIncentives={solarIncentives}
                energyCostPerKWh={energyCostPerKWh}  />

                  </Box>

                </Box>
                <Box>
                  <div ref={annualEnergyRef}></div>
                  <Box>
                      <FinancialAnalysis panelsCount={panelsCount}
                                         yearlyEnergyDcKwhNum={yearlyEnergyDcKwhNum}
                                         analyticsData={analyticsData}
                                         discountRate={discountRate}
                                         panelCapacity={panelCapacity}
                                         installationCostPerKWH={installationCostPerKWH}
                                         annualEnergyConsumption={annualEnergyConsumption}
                                         lifetimeEnergyConsumption={lifetimeEnergyConsumption}
                                         lifetimeProductionAcKwh={lifetimeProductionAcKwh}
                      />
                  </Box>

                </Box>
                <Box>
                  <Box p={6} shadow="md" borderWidth="1px" height={"14%"}>
                    <Heading size="md">Data Layers</Heading>
                    <Text>monthlySunshine</Text>

                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    <Text mb={3}>Cost analysis for 20 years</Text>
                    {/* This is a placeholder for your graph */}
                    <Progress colorScheme="red" size="lg" value={70}/>
                    {/* You will replace the Progress bar with your actual graph */}
                  </Box>
                </Box>

              </SimpleGrid>


  );
}