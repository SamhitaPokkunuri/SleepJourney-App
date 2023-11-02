import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme, styled, css } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiTypography from '@mui/material/Typography';
import MuiBox from '@mui/material/Box';

import { IconButton } from 'components';
import CardOverlay from './CardOverlay';
import MapSlider from './MapSlider';
import { getGlobeMap } from 'lib/graphql/getGlobeMap';

// Example
// https://www.gitmemory.com/issue/vasturiano/react-globe.gl/21/730492087

const StyledGlobeMap = styled(MuiBox)(
  ({ theme }) => css`
    max-width: ${theme.containers.values.md}px;
    margin: 0 auto 30px;

    ${theme.breakpoints.up('md')} {
      display: flex;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
    }

    .globeContainer {
      ${theme.breakpoints.up('md')} {
        flex-basis: 50%;
        flex-grow: 0;
        max-width: 50%;
        display: flex;
        justify-content: flex-end;
      }

      ${theme.breakpoints.between('sm', 'md')} {
        justify-content: center;
      }
    }

    .globe {
      margin: -60px -16px -16px;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;

      ${theme.breakpoints.up(480)} {
        margin-left: -24px;
        margin-right: -24px;
      }

      ${theme.breakpoints.between('sm', 'md')} {
        justify-content: center;
      }

      ${theme.breakpoints.up('md')} {
        margin-left: 0;
        margin-right: -48px;
        overflow: visible;
      }
    }

    .overMap {
      position: relative;
      z-index: 1;
      max-width: ${theme.containers.values.sm}px;
      margin-right: auto;
      margin-left: auto;
      width: 100%;

      ${theme.breakpoints.up('md')} {
        padding-left: 10px;
      }
    }

    .swipeButton {
      text-align: center;
      pointer-events: none;

      button {
        border-radius: 2px;
      }
    }

    .sliderContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;

      ${theme.breakpoints.up('md')} {
        flex-basis: 50%;
        flex-grow: 0;
        max-width: 50%;
      }
    }

    .titleDesktop {
      margin-top: 0;
    }
  `
);

export default function GlobeMap(props) {
  const { selectedMap, skin } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletDwn = useMediaQuery(theme.breakpoints.down('md'));
  let mapSize = 1160;

  if (isTabletDwn) {
    mapSize = 860;
  }
  if (isMobile) {
    mapSize = 700;
  }

  const globeEl = useRef();
  const [places, setPlaces] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobileSlider, setMobileSlider] = useState(false);
  const [open, setOpen] = useState(false);
  const ROTATION_SPEED = 500;

  let Globe = () => null;
  if (typeof window !== 'undefined') {
    Globe = require('react-globe.gl').default;
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  useEffect(() => {
    // load data
    let tmpData = [];
    async function loadData() {
      tmpData = await getGlobeMap(selectedMap.id);
      setApiData(tmpData);
      const mapData = [];

      tmpData &&
        tmpData.fieldLocation &&
        tmpData.fieldLocation.forEach((item, idx) => {
          mapData.push({
            lat: item.entity.fieldLocationLatitude,
            lng: item.entity.fieldLocationLongitude,
            alt: 0.03,
            color: '#fff',
            radius: 2,
            vdfId: idx,
            pin: item.entity.fieldLocationPin,
          });
        });
      setPlaces(mapData);
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // https://github.com/vasturiano/react-globe.gl/issues/15
    // Auto-rotate
    if (globeEl.current && window) {
      globeEl.current.controls().autoRotate = false;
      // globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enablePointerInteraction = true;

      if (apiData.fieldInitialLatitude && apiData.fieldInitialLongitude) {
        // const MAP_CENTER = { lat: places[0].lat, lng: places[0].lng, altitude: 2 };
        const MAP_CENTER = {
          lat: Number(apiData.fieldInitialLatitude),
          lng: Number(apiData.fieldInitialLongitude),
          altitude: 2,
        };
        globeEl.current.pointOfView(MAP_CENTER, ROTATION_SPEED);
      }
      globeEl.current.controls().update();

      // Move Light
      // if (globeEl.current !== undefined) {
      //   const scene = globeEl.current.scene();
      // }

      // Restrict orbit vertically & horizontally
      // https://stackoverflow.com/questions/25308943/limit-orbitcontrols-horizontal-rotation/25311658#25311658
      // https://threejs.org/docs/#examples/en/controls/OrbitControls
      const controls = globeEl.current.controls();

      function degrees_to_radians(degrees) {
        return degrees * (Math.PI / 180);
      }

      // |---------------------------------------------------------------------
      // | How far you can orbit vertically, upper and lower limits.
      // | Range is 0 to Math.PI radians.
      // |---------------------------------------------------------------------
      // | How far you can orbit vertically, lower limit. Range is 0 to Math.PI radians, and default is 0.
      if (apiData.fieldMinPolarAngle) {
        controls.minPolarAngle = degrees_to_radians(apiData.fieldMinPolarAngle); // radians
      }
      // | How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI.
      if (apiData.fieldMaxPolarAngle) {
        controls.maxPolarAngle = degrees_to_radians(apiData.fieldMaxPolarAngle); // radians
      }
      // |---------------------------------------------------------------------
      // | How far you can orbit horizontally, upper and lower limits.
      // | If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
      // |---------------------------------------------------------------------
      // | How far you can orbit horizontally, lower limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is Infinity.
      if (apiData.fieldMinAzimuthAngle) {
        controls.minAzimuthAngle = degrees_to_radians(
          apiData.fieldMinAzimuthAngle
        ); // radians
      }
      // | How far you can orbit horizontally, upper limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is Infinity.
      if (apiData.fieldMaxAzimuthAngle) {
        controls.maxAzimuthAngle = degrees_to_radians(
          apiData.fieldMaxAzimuthAngle
        ); // radians
      }
      globeEl.current.controls().update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  useEffect(() => {
    // console.log('rerender', slideIndex);
  }, [slideIndex]);

  const onSliderChange = (next) => {
    setSlideIndex(next);
    if (globeEl.current && window) {
      const CENTER_POINT = {
        ...places[next],
        lat: Number(places[next].lat),
        lng: Number(places[next].lng),
      };
      globeEl.current.pointOfView(CENTER_POINT, ROTATION_SPEED);
    }
  };

  return (
    <StyledGlobeMap container spacing={2}>
      <MuiBox className="globeContainer">
        {isTabletDwn && apiData && (
          <MuiBox className="overMap">
            <MuiTypography variant="h2" align="left">
              {apiData.title}
            </MuiTypography>
            <MuiTypography variant="body1" align="left">
              {apiData.fieldMapDescription}
            </MuiTypography>
          </MuiBox>
        )}
        <MuiBox className="globe">
          <Globe
            ref={globeEl}
            width={mapSize}
            height={mapSize}
            globeImageUrl={`/images/map/${skin}-map.png`}
            showAtmosphere={true}
            atmosphereColor={'#000000'}
            atmosphereAltitude={0.1}
            onGlobeReady={() => {
              const scene = globeEl.current?.scene();
              // scene.children[2].intensity = 0.4;
              scene.children[1].intensity = 0;
              scene.children[2].intensity = 0;
              const light = new THREE.HemisphereLight(0xffffff, 0xf6f6f5, 1);
              scene.add(light);
            }}
            // backgroundColor="#f4f4f4"
            backgroundColor="rgba(0,0,0,0)"
            customLayerData={places}
            customThreeObject={(d) => {
              // https://stackoverflow.com/questions/36668836/threejs-displaying-a-2d-image/36691592
              let locationPin = 'vodafone';
              if (d.pin) {
                locationPin = d.pin;
              }

              var map = new THREE.TextureLoader().load(
                `/images/map/${locationPin}-pin.svg`
              );

              map.matrixAutoUpdate = false;
              var material = new THREE.SpriteMaterial({
                map: map,
                color: 0xffffff,
                rotation: 0,
              });
              material.bumpScale = 0.05;
              var sprite = new THREE.Sprite(material);
              sprite.scale.set(10, 11, 1.2);
              // sprite.position.set(40, 40, 40);
              return sprite;
            }}
            customThreeObjectUpdate={(obj, d) => {
              Object.assign(
                obj.position,
                globeEl.current.getCoords(d.lat, d.lng, d.alt)
              );
            }}
            onCustomLayerClick={(e) => {
              const CENTER_POINT = {
                ...e,
                lat: Number(e.lat),
                lng: Number(e.lng),
              };
              globeEl.current.pointOfView(CENTER_POINT, ROTATION_SPEED);
              setSlideIndex(e.vdfId);
              setMobileSlider(true);
            }}
            // onCustomLayerHover={(e) => console.log('custom hover', e)}
          />
        </MuiBox>
        {isTabletDwn && (
          <MuiBox className="swipeButton">
            <IconButton
              icon="SwipeAcross"
              iconSet="global"
              customColors={{
                background: theme.palette.common.white,
                text: theme.palette.common.darkGrey,
              }}
              size="large"
            >
              Swipe across
            </IconButton>
          </MuiBox>
        )}
      </MuiBox>
      <MuiBox className="sliderContainer">
        {!isTabletDwn && apiData && (
          <MuiBox className="overMap">
            <MuiTypography variant="h2" align="left" className="titleDesktop">
              {apiData.title}
            </MuiTypography>
            <MuiTypography variant="body1" align="left">
              {apiData.fieldMapDescription}
            </MuiTypography>
          </MuiBox>
        )}
        {(mobileSlider || !isTabletDwn) && (
          <MuiBox>
            {apiData.fieldLocation && apiData.fieldLocation.length > 0 && (
              <>
                <MapSlider
                  slideIndex={slideIndex}
                  apiData={apiData}
                  open={true}
                  setSlideIndex={setSlideIndex}
                  onSliderChange={(e) => onSliderChange(e)}
                  setMobileSlider={setMobileSlider}
                  isMobile={isMobile}
                  handleOpen={handleOpen}
                />
                <CardOverlay
                  open={open}
                  setOpen={setOpen}
                  mainTitle={apiData.title}
                  item={apiData.fieldLocation[slideIndex]}
                />
              </>
            )}
          </MuiBox>
        )}
      </MuiBox>
    </StyledGlobeMap>
  );
}
