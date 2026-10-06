
export function panelCountBasedOnCapacity(panelsCount,panelCapacity) {
    // Calculate the annual production of an energy system
    if (panelCapacity===250){
        return panelsCount;
    }
    else if (panelCapacity!==0){
        return (panelsCount*250)/panelCapacity;
    }
    else{
        return 0;
    }

}
export function annualProduction(dcToAcDerate, initialAcKwhPerYear, efficiencyDepreciationFactor, year) {
    // Calculate the annual production of an energy system
    return dcToAcDerate * initialAcKwhPerYear * Math.pow((1 - efficiencyDepreciationFactor), year);
}

export function lifetimeProductionAcKwhFunc(dcToAcDerate, yearlyEnergyDcKwh, efficiencyDepreciationFactor, installationLifeSpan) {
    // Calculate the lifetime production in kWh
    return dcToAcDerate * yearlyEnergyDcKwh * (1 - Math.pow(efficiencyDepreciationFactor, installationLifeSpan)) / (1 - efficiencyDepreciationFactor);
}

function billCostModel(kwh) {
    // Cost model for billing
    return kwh * 0.17900; // Fixed an apparent typo in the original Python code
}

export function annualUtilityBillEstimate(dcToAcDerate,yearlyKWhEnergyConsumption, initialAcKwhPerYear, efficiencyDepreciationFactor, year, costIncreaseFactor, discountRate) {
    // Estimate the annual utility bill
    let annualProductionResult = annualProduction(dcToAcDerate, initialAcKwhPerYear, efficiencyDepreciationFactor, year);
    return billCostModel(yearlyKWhEnergyConsumption - annualProductionResult) * Math.pow(costIncreaseFactor, year) / Math.pow(discountRate, year);
}

export function lifetimeUtilityBill(yearlyKWhEnergyConsumption, initialAcKwhPerYear, efficiencyDepreciationFactor,
                             installationLifeSpan, costIncreaseFactor, discountRate) {
    // Calculate the lifetime utility bill
    let bill = new Array(installationLifeSpan).fill(0);
    for (let year = 0; year < installationLifeSpan; year++) {
        bill[year] = annualUtilityBillEstimate(yearlyKWhEnergyConsumption, initialAcKwhPerYear, efficiencyDepreciationFactor, year, costIncreaseFactor, discountRate);
    }
    return bill;
}

export function lifetimeBillWithoutPV(monthlyBill, costIncreaseFactor, discountRate, installationLifeSpan) {
    // Calculate the lifetime bill without PV
    return monthlyBill * 12 * (1 - Math.pow(costIncreaseFactor / discountRate, installationLifeSpan)) / (1 - costIncreaseFactor / discountRate);
}
