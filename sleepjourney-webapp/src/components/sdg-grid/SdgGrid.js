import { useState } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import { NextImage } from 'components';
import SdgSlider from './SdgSlider';

const StyledSdgGrid = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(1)};

    .topGrid {
      display: flex;
      margin: 0 -8px;
    }

    .mainImage {
      width: 75%;
      padding: 0 16px 0 5px;
    }

    .gridImages {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -11px;

      ${theme.breakpoints.up('lg')} {
        margin: 0 -8px;
      }
    }

    .imageItem {
      width: 25%;
      padding: 6px 8px 6px;
      opacity: 0.5;
      transition: transform 0.3s;

      &:hover {
        opacity: 0.75;
        background-color: transparent;
      }
    }

    .mainGridImages {
      width: 33.3333333%;
      padding: 11px 13px 11px;

      ${theme.breakpoints.up('lg')} {
        width: 25%;
        padding: 6px 8px 6px;
      }
    }

    .activeItem {
      opacity: 1;
      transform: scale(1.1);
      z-index: 1;
    }

    .columnLeft {
      ${theme.breakpoints.up('xl')} {
        padding-right: 4.1666665% !important;
      }
    }

    .columnRight {
      ${theme.breakpoints.up('md')} {
        padding-left: 4.1666665% !important;
      }
    }

    .mwcWrapper {
      margin-top: 40px;
    }
  `
);

export default function SdgGrid(props) {
  const { title, sdgs, mode } = props;
  const [slideIndex, setSlideIndex] = useState(0);

  const onSliderChange = (next) => {
    setSlideIndex(next);
  };

  const handleClick = (e, idx) => {
    // const id = e.currentTarget.id;
    setSlideIndex(idx);
  };

  const sortedSdgs = sdgs.sort((a, b) =>
    parseInt(a.sdgOrder, 10) > parseInt(b.sdgOrder, 10) ? 1 : -1
  );
  return (
    <StyledSdgGrid>
      <MuiGrid container spacing={2} role="grid">
        <MuiGrid
          item
          xs={12}
          md={6}
          className="columnLeft"
          role="gridcell"
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          {mode !== 'mwc_demo' && (
            <div className="topGrid">
              <div className="mainImage">
                <NextImage
                  src="/images/sdgs/sdgs.png"
                  width={791}
                  height={237}
                  alt="sdg head"
                />
              </div>
              <MuiButton
                className={clsx('imageItem', {
                  activeItem: 0 === slideIndex,
                })}
                id={sortedSdgs[0].id}
                onClick={(e) => handleClick(e, 0)}
              >
                <NextImage
                  src={sortedSdgs[0].sdgImageUrl}
                  width={200}
                  height={200}
                  alt={sortedSdgs[0].title}
                />
              </MuiButton>
            </div>
          )}
          <div className="gridImages">
            {sortedSdgs.map((sdg, idx) => {
              if (idx !== 0 || mode === 'mwc_demo') {
                return (
                  <MuiButton
                    className={clsx('imageItem', 'mainGridImages', {
                      activeItem: idx === slideIndex,
                    })}
                    id={sdg.id}
                    key={sdg.id}
                    onClick={(e) => handleClick(e, idx)}
                  >
                    <NextImage
                      src={sdg.sdgImageUrl}
                      width={200}
                      height={200}
                      alt={sdg.title}
                    />
                  </MuiButton>
                );
              }
            })}
          </div>
        </MuiGrid>
        <MuiGrid item xs={12} md={6} className="columnRight" role="gridcell">
          <MuiTypography variant="h2" align="left" className="titleDesktop">
            {title}
          </MuiTypography>
          <SdgSlider
            mode={mode}
            sdgs={sortedSdgs}
            slideIndex={slideIndex}
            setSlideIndex={setSlideIndex}
            onSliderChange={(e) => onSliderChange(e)}
          />
          {mode === 'mwc_demo' && (
            <div className="mwcWrapper">
              <NextImage
                src="/images/mwc/MWC_grid_key.jpg"
                width={470}
                height={35}
                alt="mwc key"
              />
            </div>
          )}
        </MuiGrid>
      </MuiGrid>
    </StyledSdgGrid>
  );
}
