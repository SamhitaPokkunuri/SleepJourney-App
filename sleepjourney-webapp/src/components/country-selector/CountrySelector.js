import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiCollapse from '@mui/material/Collapse';
import MuiIconButton from '@mui/material/IconButton';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiTypography from '@mui/material/Typography';

import { selectUiByKey, updateCountrySelector } from 'lib/slices/uiSlice';
import { Flag } from 'components';
import data from './countries';

const StyledCountrySelector = styled(MuiBox)(
  ({ theme }) => css`
    background: ${theme.palette.common.darkGrey};
    color: ${theme.palette.common.white};

    .countrySelectorTitle {
      margin: 0 auto 8px;

      ${theme.breakpoints.up('sm')} {
        max-width: calc(100% - 80px);
      }
    }

    .countrySelectorSubTitle {
      &,
      &:first-of-type {
        margin: 0;
      }
    }

    .countrySelectorContainer {
      position: relative;
      max-width: ${theme.containers.values.sm}px;

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
      }
    }

    .countrySelectorInner {
      text-align: center;
      position: relative;
      padding: 40px 12px;

      ${theme.breakpoints.up('md')} {
        max-width: 83.33333%;
        margin: 0 auto;
        padding-top: 60px;
        padding-bottom: 60px;
      }
    }

    .closeButton {
      font-size: 0;
      line-height: 0;
      position: absolute;
      top: 15px;
      right: 15px;
      margin: 0;
      padding: 0;
      display: inline-block;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background: transparent;
      border: 0;
      color: #fff;
      z-index: 1;

      &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        line-height: 1;
        font-family: VodafoneIcons;
        font-style: normal;
        font-weight: 400;
        content: ${theme.icons.close};
        font-size: 1.5rem;
      }

      ${theme.breakpoints.up('sm')} {
        top: 28px;
        right: 28px;

        &:before {
          font-size: 1.75rem;
        }
      }

      ${theme.breakpoints.up('md')} {
        width: 34px;
        height: 34px;
        top: 40px;
        right: 40px;

        &:before {
          font-size: 2.125rem;
        }
      }
    }

    .regionContainer {
      text-align: left;
      margin: 14px 5px;
      width: auto;

      ${theme.breakpoints.up('sm')} {
        display: flex;
        flex-wrap: wrap;
        margin: 40px -10px;
      }

      ${theme.breakpoints.up('md')} {
        margin: 56px -10px;
      }
    }

    .regionTitle {
      padding: 16px 0 16px 12px;
      border-bottom: 1px solid ${theme.palette.common.dimGrey};
      position: relative;
      margin: 0;

      ${theme.breakpoints.up('sm')} {
        padding: 9px 0 4px;
        margin-bottom: 8px;
      }

      ${theme.breakpoints.down('sm')} {
        &:before {
          padding: 0;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          position: absolute;
          right: 12px;
          line-height: 1;
          font-family: VodafoneIcons;
          font-style: normal;
          font-weight: 400;
          font-size: 0.75rem;
          transition: all 0.5s ease;
          color: ${theme.palette.common.white};
          content: ${theme.icons.chevronDownXL};
        }
      }
    }

    .region {
      width: auto;
      flex: 1;

      ${theme.breakpoints.up('sm')} {
        min-width: 16.66667%;
        padding: 0 10px;
      }

      ${theme.breakpoints.up('md')} {
        &:nth-of-type(1),
        &:nth-of-type(3) {
          flex: 2;
        }
      }

      &.expanded > &:before {
        color: ${theme.palette.common.white};
        transform: rotateX(180deg);
      }
    }

    .countryList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 16px 12px;

      ${theme.breakpoints.up('sm')} {
        padding: 0;
      }
    }

    .countryListItem {
      width: 100%;
      font-size: 1.25rem;
      line-height: 2rem;
      margin-bottom: 3px;
      padding: 0;

      a {
        color: ${theme.palette.common.white};
        text-decoration: none;
        white-space: nowrap;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      }
    }

    .divided {
      ${theme.breakpoints.up('md')} {
        width: calc(50% - 20px);
      }
    }
  `
);

export default function CountrySelector() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isCollapsible = useMediaQuery(theme.breakpoints.down('sm'));
  const countrySelector = useSelector(selectUiByKey('countrySelector'));
  const handleToggleState = () => () => {
    if (countrySelector.isExpanded) {
      dispatch(updateCountrySelector({ isExpanded: false }));

      setTimeout(() => {
        dispatch(updateCountrySelector({ isVisible: false }));
      }, 500);
    } else {
      dispatch(updateCountrySelector({ isExpanded: true, isVisible: true }));
    }
  };

  const handleMobileAccordion = (title) => () => {
    if (isCollapsible) {
      dispatch(updateCountrySelector({ expanded: [title] }));
    }
  };

  return (
    <StyledCountrySelector>
      <MuiCollapse in={countrySelector.isExpanded} timeout={500}>
        <MuiContainer className="countrySelectorContainer">
          <MuiIconButton
            color="inherit"
            className="closeButton"
            aria-label="close country selector"
            onClick={handleToggleState(countrySelector.isExpanded)}
            size="large"
          >
            Close Country Selector
          </MuiIconButton>
          <MuiBox className="countrySelectorInner">
            <MuiTypography
              className="countrySelectorTitle"
              variant="h3"
              component="h3"
            >
              Are you looking for information about offers, devices or your
              account?
            </MuiTypography>
            <MuiTypography
              className="countrySelectorSubTitle"
              variant="body1"
              component="p"
            >
              Please choose your local Vodafone website
            </MuiTypography>
            <MuiContainer className="regionContainer">
              {data.map((region) => {
                const { title, countries } = region;
                const hasTitle = countrySelector.expanded.includes(title);
                const isExpanded =
                  (hasTitle && isCollapsible) || !isCollapsible;

                return (
                  <MuiBox
                    key={title}
                    className={clsx('region', { expanded: isExpanded })}
                  >
                    <MuiTypography
                      className="regionTitle"
                      variant="h4"
                      component="h4"
                      onClick={handleMobileAccordion(title)}
                    >
                      {title}
                    </MuiTypography>
                    <MuiCollapse in={isExpanded}>
                      <MuiList className="countryList" disablePadding>
                        {countries.map((country) => {
                          const { name, divided, link, code } = country;

                          return (
                            <MuiListItem
                              key={name}
                              className={clsx('countryListItem', {
                                divided,
                              })}
                            >
                              <Flag code={code} />
                              <a
                                target="_blank"
                                href={link}
                                rel="noopener noreferrer"
                                title={name}
                              >
                                {name}
                              </a>
                            </MuiListItem>
                          );
                        })}
                      </MuiList>
                    </MuiCollapse>
                  </MuiBox>
                );
              })}
            </MuiContainer>
            {!isCollapsible && (
              <MuiButton
                color="primary"
                variant="outlined"
                onClick={handleToggleState(countrySelector.isExpanded)}
              >
                No thanks, I want to stay on Vodafone.com
              </MuiButton>
            )}
          </MuiBox>
        </MuiContainer>
      </MuiCollapse>
    </StyledCountrySelector>
  );
}
