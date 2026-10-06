import DataLayerOverlay from "../interfaces/DataLayerOverlay.ts";
import {
    findClosestBuildingInsights,
    getDataLayers
} from "@nora-soderlund/google-maps-solar-api";
import getDataLayersCanvas from ".././getDataLayersCanvas.ts";

const ShowInsightsForCoordinate = (apiKey, coordinate, map, storedbuildingInsights, setStoredbuildingInsights, solarPanelPolygons, solarPanelPolygonReferences, props,setYearlyEnergyDcKwhNum) => {

    var buildingInsights = {};
    const getBuildingInsights = async (apiKey, coordinate) => {
        buildingInsights = await findClosestBuildingInsights(apiKey, {location: coordinate});
        console.log(buildingInsights)
        setStoredbuildingInsights(buildingInsights)
        map.moveCamera({
            center: {
                lat: buildingInsights.center.latitude,
                lng: buildingInsights.center.longitude
            },

            zoom: 19
        })

        const radius = Math.max(
            window.google.maps.geometry.spherical.computeDistanceBetween(
                {
                    lat: buildingInsights.boundingBox.ne.latitude,
                    lng: buildingInsights.boundingBox.ne.longitude
                },
                {
                    lat: buildingInsights.boundingBox.sw.latitude,
                    lng: buildingInsights.boundingBox.sw.longitude
                }
            ) / 2,
            20
        )

        const location = {
            lat: coordinate.latitude,
            lng: coordinate.longitude
        }

        const coordinateBounds = [
            window.google.maps.geometry.spherical.computeOffset(location, radius, 0),
            window.google.maps.geometry.spherical.computeOffset(location, radius, 90),
            window.google.maps.geometry.spherical.computeOffset(location, radius, 180),
            window.google.maps.geometry.spherical.computeOffset(location, radius, 270)
        ]

        const dataLayers = await getDataLayers(apiKey, {
            location: coordinate,
            radiusMeters: radius,
            view: "IMAGERY_AND_ANNUAL_FLUX_LAYERS"
        })

        const bounds = new window.google.maps.LatLngBounds()

        coordinateBounds.forEach(coordinate => {
            bounds.extend(coordinate)
        })

        const image = await getDataLayersCanvas(dataLayers)

        const dataLayerOverlay = DataLayerOverlay.create(bounds, image)

        dataLayerOverlay.setMap(map)

        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(
            props.panelElement
        )
        console.log("At Set of addEventListener", buildingInsights)
        setPotentialSegment(map, 0, buildingInsights)

        updatePanel(0, buildingInsights)

    };

    getBuildingInsights(apiKey, coordinate);

    props.panelSliderElement.addEventListener("input", () => {

        setPotentialSegment(map, parseInt(props.panelSliderElement.value), buildingInsights)
    })
    const updatePanel = (current, buildingInsights) => {
        props.panelSliderElement.value = current.toString()
        props.panelSliderElement.max = (
            buildingInsights.solarPotential.solarPanelConfigs.length - 1
        ).toString()
    }
    const updatePanelData = (segmentIndex, buildingInsights) => {
        if (buildingInsights && buildingInsights.solarPotential) {
            const solarPanelConfig = buildingInsights.solarPotential
                .solarPanelConfigs[segmentIndex]
            const lastSolarPanelConfig = buildingInsights.solarPotential
                .solarPanelConfigs[
            buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ]

            props.panelCountConicElement.style.setProperty(
                "--progress",
                (
                    (solarPanelConfig.panelsCount / lastSolarPanelConfig.panelsCount) *
                    75
                ).toString() + "%"
            )
            props.panelCountConicInnerElement.innerText =
                solarPanelConfig.panelsCount.toString() +
                "/" +
                lastSolarPanelConfig.panelsCount.toString()

            props.panelEnergyConicElement.style.setProperty(
                "--progress",
                (
                    (solarPanelConfig.yearlyEnergyDcKwh /
                        lastSolarPanelConfig.yearlyEnergyDcKwh) *
                    75
                ).toString() + "%"
            )
            props.panelEnergyConicInnerElement.innerText =
                Math.round(solarPanelConfig.yearlyEnergyDcKwh).toString() + " kwh"
            setYearlyEnergyDcKwhNum( Math.round(solarPanelConfig.yearlyEnergyDcKwh))
        } else {
            return
        }

    }
    const setPotentialSegment = (map, configIndex, buildingInsights) => {

        updatePanelData(configIndex, buildingInsights)
        solarPanelPolygons.forEach(polygon => polygon.setMap(null))
        let setSolarPanelPolygons = []

        const solarPanelConfig = buildingInsights.solarPotential
            .solarPanelConfigs[configIndex]

        let panelsCount = 0

        solarPanelConfig.roofSegmentSummaries.forEach(roofSegmentSummary => {
            buildingInsights.solarPotential.solarPanels
                .filter(
                    solarPanel =>
                        solarPanel.segmentIndex === roofSegmentSummary.segmentIndex
                )
                .slice(
                    0,
                    Math.min(
                        solarPanelConfig.panelsCount - panelsCount,
                        roofSegmentSummary.panelsCount
                    )
                )
                .forEach(solarPanel => {
                    let height =
                        buildingInsights.solarPotential.panelHeightMeters / 2
                    let width = buildingInsights.solarPotential.panelWidthMeters / 2

                    if (solarPanel.orientation === "LANDSCAPE") {
                        const previousHeight = height

                        height = width
                        width = previousHeight
                    }

                    const angle = roofSegmentSummary.azimuthDegrees

                    if (!solarPanelPolygonReferences.current.has(solarPanel)) {
                        const center = {
                            lat: solarPanel.center.latitude,
                            lng: solarPanel.center.longitude
                        }

                        const top = window.google.maps.geometry.spherical.computeOffset(
                            center,
                            height,
                            angle + 0
                        )
                        const right = window.google.maps.geometry.spherical.computeOffset(
                            center,
                            width,
                            angle + 90
                        )
                        const left = window.google.maps.geometry.spherical.computeOffset(
                            center,
                            width,
                            angle + 270
                        )

                        const topRight = window.google.maps.geometry.spherical.computeOffset(
                            top,
                            width,
                            angle + 90
                        )
                        const bottomRight = window.google.maps.geometry.spherical.computeOffset(
                            right,
                            height,
                            angle + 180
                        )
                        const bottomLeft = window.google.maps.geometry.spherical.computeOffset(
                            left,
                            height,
                            angle + 180
                        )
                        const topLeft = window.google.maps.geometry.spherical.computeOffset(
                            left,
                            height,
                            angle + 0
                        )

                        solarPanelPolygonReferences.current.set(solarPanel, new window.google.maps.Polygon({
                            map: map,

                            fillColor: "#2B2478",
                            fillOpacity: 0.8,

                            strokeWeight: 1,
                            strokeColor: "#AAAFCA",
                            strokeOpacity: 1,

                            geodesic: false,

                            paths: [
                                topRight,
                                bottomRight,
                                bottomLeft,
                                topLeft
                            ]
                        }));
                    }

                    const polygon = solarPanelPolygonReferences.current.get(solarPanel)
                    polygon.setMap(map)

                    solarPanelPolygons.push(polygon)
                })

            panelsCount += roofSegmentSummary.panelsCount
        })

    }


    // Optional: Render some UI elements if needed

};

export default ShowInsightsForCoordinate;
