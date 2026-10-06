import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,SimpleGrid
} from '@chakra-ui/react';

export default function BuildingAnalytics({insights}) {
const formatImageryDate = (date) => `${date.year}-${date.month}-${date.day}`;

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">{insights.name}</Text>
      <Text>Region: {insights.regionCode}</Text>
      <Text>Imagery Date: {formatImageryDate(insights.imageryDate)}</Text>

      {/* Solar Potential Section */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">Solar Potential</Text>
        <SimpleGrid columns={2} spacing={10}>
          <Stat>
            <StatLabel>Max Array Panels Count</StatLabel>
            <StatNumber>{insights.solarPotential.maxArrayPanelsCount}</StatNumber>
          </Stat>
          {/* Add more stats */}
          <Stat>
            <StatLabel>Max Array Area (m²)</StatLabel>
            <StatNumber>{insights.solarPotential.maxArrayAreaMeters2}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Max Sunshine Hours Per Year</StatLabel>
            <StatNumber>{insights.solarPotential.maxSunshineHoursPerYear}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Carbon Offset Factor (Kg/MWh)</StatLabel>
            <StatNumber>{insights.solarPotential.carbonOffsetFactorKgPerMwh}</StatNumber>
          </Stat>
        </SimpleGrid>
      </Box>

      {/* Roof Segment Stats */}
      <Accordion allowMultiple mt={4}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Roof Segment Stats
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {insights.solarPotential.roofSegmentStats.map((segment, index) => (
              <Box key={index} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                <Text fontWeight="bold">Segment {index + 1}</Text>
                <SimpleGrid columns={3} spacing={10}>
                  <Stat>
                    <StatLabel>Pitch Degrees</StatLabel>
                    <StatNumber>{segment.pitchDegrees}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Azimuth Degrees</StatLabel>
                    <StatNumber>{segment.azimuthDegrees}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Segment Area In Square Meters</StatLabel>
                    <StatNumber>{segment.stats.areaMeters2}</StatNumber>
                  </Stat>
                  {/* More segment stats here */}
                </SimpleGrid>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
        {/* Add more accordion items for other detailed sections */}
      </Accordion>
       {/* Solar Potential Section */}
      <Box mt={4}>
        {/* Existing Solar Potential Stats */}
      </Box>

      {/* Whole Roof Stats */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">Whole Roof Stats</Text>
        <SimpleGrid columns={2} spacing={10}>
          <Stat>
            <StatLabel>Total Area (m²)</StatLabel>
            <StatNumber>{insights.solarPotential.wholeRoofStats.areaMeters2}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Ground Area (m²)</StatLabel>
            <StatNumber>{insights.solarPotential.wholeRoofStats.groundAreaMeters2}</StatNumber>
          </Stat>
          {/* You can add more stats like sunshine quantiles here */}
        </SimpleGrid>
      </Box>

      {/* Solar Panel Details */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">Solar Panel Details</Text>
        <SimpleGrid columns={2} spacing={10}>
          <Stat>
            <StatLabel>Panel Capacity (Watts)</StatLabel>
            <StatNumber>{insights.solarPotential.panelCapacityWatts}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Panel Height (Meters)</StatLabel>
            <StatNumber>{insights.solarPotential.panelHeightMeters}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Panel Width (Meters)</StatLabel>
            <StatNumber>{insights.solarPotential.panelWidthMeters}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Panel Lifetime (Years)</StatLabel>
            <StatNumber>{insights.solarPotential.panelLifetimeYears}</StatNumber>
          </Stat>
        </SimpleGrid>
      </Box>
      {/* Footer Section */}
      <Box mt={4}>
        <Text>Imagery Quality: {insights.imageryQuality}</Text>
        <Text>Processed Date: {formatImageryDate(insights.imageryProcessedDate)}</Text>
      </Box>
    </Box>
  );
}