// https://www.react-simple-maps.io/examples/usa-with-state-labels/
// https://codesandbox.io/s/usa-state-labels-map-fvi5o?from-embed=&file=/src/MapChart.js:0-2047
// https://react-leaflet.js.org/docs/example-events/
// https://planthardiness.ars.usda.gov/
// https://www.prism.oregonstate.edu/projects/plant_hardiness_zones.php

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// import allStates from "./data/allstates.json";

const geoUrl = "../../../files/gardening/phm_us_shp.json";


// const offsets = {
//   VT: [50, -8],
//   NH: [34, 2],
//   MA: [30, -1],
//   RI: [28, 2],
//   CT: [35, 10],
//   NJ: [34, 1],
//   DE: [33, 0],
//   MD: [47, 10],
//   DC: [49, 21]
// };

const GardenHardinessMap = () => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
              />
            ))}
            {/* {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })} */}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default GardenHardinessMap;
