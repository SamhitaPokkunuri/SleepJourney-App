//Application dependencies
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiGrid from '@mui/material/Grid';
// TODO: Replace MuiLink with next/link | Styling
import MuiLink from '@mui/material/Link';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiTypography from '@mui/material/Typography';

import SocialProfiles from 'components/social/social-profiles/SocialProfiles';
import { ThemeContext } from 'components/layout/FoundationPage';
import { FontIcon } from 'components';
import { selectUiByKey } from 'lib/slices/uiSlice';

const policyDisclaimer = {
  data: [
    {
      clientId: 'fa5eda52-c378-40d1-a698-a7c04e10edfb',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content:
          'Vodafone Group Plc. Registered Office: Vodafone House. The Connection, Newbury, Berkshire RG14 2FN. Registered in England No 1833679',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
    {
      clientId: '35907ec3-47ac-4b83-9c65-3f0131474e3f',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content:
          'We use cookies to improve your experience on this site.&nbsp;<a href="https://www.vodafone.com/cookie-policies">Read our policy</a>',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
    {
      clientId: 'a3c1f387-b95c-43bd-b5a1-078da7efcff3',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content: '',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
  ],
};

const policyDisclaimerFoundation = {
  data: [
    {
      clientId: 'fa5eda52-c378-40d1-a698-a7c04e10edfb',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content:
          'Vodafone Foundation is a Charity registered with the Charity Commission for England & Wales (charity number 1193984) & \n a Company Limited by Guarantee registered in England and Wales (company number 13199169) | (Formerly The Vodafone Foundation, charity no. 1089625) | \n Registered Office: Vodafone Foundation, 1 Kingdom Street, London, W2 6BY.',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
    {
      clientId: '35907ec3-47ac-4b83-9c65-3f0131474e3f',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content:
          'We use cookies to improve your experience on this site.&nbsp;<a href="https://www.vodafone.com/cookie-policies">Read our policy</a>',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
    {
      clientId: 'a3c1f387-b95c-43bd-b5a1-078da7efcff3',
      name: 'core/paragraph',
      isValid: true,
      attributes: {
        content: '',
        dropCap: false,
        vdfblocks: {
          custom: true,
        },
        mappingField: '',
        mappingAttribute: '',
      },
      innerBlocks: [],
    },
  ],
};

const StyledFooter = styled(MuiBox)(
  ({ theme }) => css`
    background: ${theme.palette.common.darkGrey};
    color: ${theme.palette.common.white};
    padding: ${theme.spacing(3, 1.6, 4)};

    a {
      color: inherit;

      &:hover {
        color: inherit;
        text-decoration: none;
      }
    }

    ${theme.breakpoints.up(480)} {
      padding: ${theme.spacing(4, 2.4, 5)};
    }

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(5, 3.2, 6)};
    }

    ${theme.breakpoints.up('xl')} {
      padding: ${theme.spacing(5, 4.8, 6)};
    }

    ${theme.breakpoints.up('xxl')} {
      padding: ${theme.spacing(7, 6, 8)};
    }

    .container {
      ${theme.breakpoints.up('sm')} {
        max-width: ${theme.containers.values.sm}px;
      }

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.xl}px;
      }
    }

    .footerLinks {
      ${theme.breakpoints.up('md')} {
        justify-content: space-between;
        max-width: 1440px;
      }
    }

    .column {
      ${theme.breakpoints.down('md')} {
        border-top: 1px solid ${theme.palette.common.mediumGrey};

        &:last-of-type {
          border-bottom: 1px solid ${theme.palette.common.mediumGrey};
        }
      }

      ${theme.breakpoints.up('md')} {
        padding-right: ${theme.spacing(1)};
        margin-bottom: ${theme.spacing(1)};
      }
    }

    .socialProfiles {
      padding-bottom: ${theme.spacing(4)};

      ${theme.breakpoints.up('md')} {
        padding-bottom: ${theme.spacing(5)};
      }
    }

    .list {
      li {
        padding: ${theme.spacing(0)};

        a {
          padding: ${theme.spacing(1.5, 0, 0)};
        }
      }

      > li:first-of-type a {
        padding-top: 0;
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 1.125rem;
        line-height: 1.5rem;
      }
    }

    .listLegal {
      display: flex;
      flex-wrap: wrap;
      margin: ${theme.spacing(3, 0)};

      li {
        display: inline-block;
        width: auto;
        padding: 0;

        &:last-child a {
          padding-right: 0;

          &:after {
            visibility: hidden;
          }
        }
      }

      a {
        display: flex;
        align-items: baseline;
        padding: ${theme.spacing(0, 1, 0, 0)};

        &:after {
          content: '';
          border-left: 1px solid ${theme.palette.primary.main};
          height: 14px;
          margin: ${theme.spacing(0.5, 0, 0, 1)};
          position: relative;
          top: 2px;
          pointer-events: none;
          display: inline-block;

          ${theme.breakpoints.up('sm')} {
            top: 4px;
            height: 17px;
          }

          ${theme.breakpoints.up('md')} {
            margin: ${theme.spacing(0.5, 0, 0, 2)};
            top: 7px;
            height: 25px;
          }
        }

        ${theme.breakpoints.up('md')} {
          padding: ${theme.spacing(0, 2, 0, 0)};

          div {
            padding-bottom: ${theme.spacing(0.7)};
          }
        }
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.125rem;
        line-height: 1.5rem;
      }
    }

    .copyRight {
      margin-bottom: 0;

      ${theme.breakpoints.up('sm')} {
        margin-top: 0;
        margin-bottom: ${theme.spacing(3)};
      }

      ${theme.breakpoints.up('lg')} {
        margin-top: ${theme.spacing(3)};
        text-align: right;
        line-height: 44px;
      }
    }

    .policyDisclaimer {
      margin: 0;

      a {
        color: ${theme.palette.common.white};
      }

      ${theme.breakpoints.up('md')} {
        color: ${theme.palette.common.spanishGrey};
        font-size: 1rem;
      }
    }
  `
);

const StyledAccordion = styled(MuiAccordion)(
  ({ theme }) => css`
    background-color: transparent;
    color: ${theme.palette.primary.main};

    &.Mui-disabled {
      background-color: transparent;
    }
  `
);

const StyledAccordionSummary = styled(MuiAccordionSummary)(
  ({ theme }) => css`
    padding: ${theme.spacing(1)};
    min-height: auto;

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 0, 1)};
    }

    &.Mui-expanded {
      min-height: auto;
    }

    &.Mui-disabled {
      opacity: 1;
      pointer-events: all;
      cursor: pointer;
    }

    .MuiAccordionSummary-content {
      margin: 0;

      &.Mui-expanded {
        margin: 0;
      }

      h5 {
        font-weight: 400;
        margin: 0;
      }
    }

    .MuiAccordionSummary-expandIconWrapper {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      padding: 0 12px;
      position: absolute;
      right: 0;
      height: 100%;
      margin-right: 0;
      border-radius: 0;
      cursor: pointer;

      &:hover {
        background-color: transparent;
      }
    }
  `
);

const StyledAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => css`
    padding: ${theme.spacing(0.5, 1, 2)};
    border-top: none;

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0.5, 0, 0)};
    }
  `
);

function Footer() {
  const isFoundation = useContext(ThemeContext) === 'foundation';
  const year = new Date().getFullYear();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const footerMenu = useSelector(selectUiByKey('footerMenu'));
  const subFooterMenu = useSelector(selectUiByKey('subFooterMenu'));

  const [expanded, setExpanded] = useState([]);
  const handleChange = (linkId) => () => {
    const index = expanded.indexOf(linkId);

    if (index > -1) {
      const exp = [...expanded];
      exp.splice(index, 1);
      setExpanded(exp);
    } else {
      setExpanded([...expanded, linkId]);
    }
  };

  const policyDisclaimerMain = isFoundation
    ? policyDisclaimerFoundation
    : policyDisclaimer;

  return (
    <StyledFooter component="footer">
      <MuiContainer className="container">
        <MuiBox className="socialProfiles">
          {isFoundation ? (
            <SocialProfiles
              textAlign="left"
              facebook="https://www.facebook.com/VodafoneFdn/"
              twitter="https://twitter.com/vodafonefdn/"
              instagram="https://www.instagram.com/vodafonefoundation/"
              className="is-style-light"
              container={false}
              disableMargin
            />
          ) : (
            <SocialProfiles
              textAlign="left"
              facebook="https://www.facebook.com/thevodafonegroup/"
              twitter="https://twitter.com/VodafoneGroup"
              instagram="https://www.instagram.com/vodafone_group/"
              linkedin="https://www.linkedin.com/company/vodafone/"
              youtube="https://www.youtube.com/vodafonemedia"
              className="is-style-light"
              container={false}
              disableMargin
            />
          )}
        </MuiBox>
        <MuiGrid container direction="row" className="footerLinks">
          {footerMenu &&
            footerMenu.footerLinks.map((link) => {
              const listChild = link?.attributes?.children ? (
                <MuiList className="list" disablePadding>
                  {link.attributes.children.map((childLink) => (
                    <MuiListItem key={childLink.attributes.id} disableGutters>
                      <MuiLink
                        component="a"
                        target={
                          childLink.attributes.path.options.attributes.target
                        }
                        rel={
                          childLink.attributes.path.options.attributes
                            .target === '_blank'
                            ? 'noreferrer'
                            : undefined
                        }
                        href={childLink.attributes.path.url.path}
                        underline="hover"
                      >
                        <MuiListItemText
                          primary={childLink.attributes.label}
                          disableTypography
                        />
                      </MuiLink>
                    </MuiListItem>
                  ))}
                </MuiList>
              ) : (
                ''
              );

              return (
                <MuiGrid
                  key={link.attributes.id}
                  item
                  xs={12}
                  md="auto"
                  className="column"
                >
                  <StyledAccordion
                    square
                    elevation={0}
                    className="accordion"
                    disabled={isDesktop}
                    expanded={
                      isDesktop || expanded.indexOf(link.attributes.id) > -1
                    }
                    onChange={handleChange(link.attributes.id)}
                  >
                    <StyledAccordionSummary
                      aria-controls={`${link.attributes.id}-content`}
                      id={link.attributes.id}
                      expandIcon={
                        !isDesktop && (
                          <FontIcon
                            icon="chevronDownXL"
                            fontSize="inherit"
                            color="white"
                          />
                        )
                      }
                    >
                      <MuiTypography variant="h5">
                        {isDesktop ? (
                          <MuiLink
                            target={
                              link.attributes.path.options.attributes.target
                            }
                            rel={
                              link.attributes.path.options.attributes.target ===
                              '_blank'
                                ? 'noreferrer'
                                : undefined
                            }
                            href={link.attributes.path.url.path}
                            key={link.attributes.id}
                            underline="hover"
                          >
                            {link.attributes.label}
                          </MuiLink>
                        ) : (
                          link.attributes.label
                        )}
                      </MuiTypography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>{listChild}</StyledAccordionDetails>
                  </StyledAccordion>
                </MuiGrid>
              );
            })}
        </MuiGrid>

        <MuiGrid container direction="row">
          <MuiGrid item xs={12} lg={9}>
            <MuiList disablePadding className="listLegal">
              {subFooterMenu &&
                subFooterMenu.subFooterLinks.map((link) => (
                  <MuiListItem key={link.attributes.id} disableGutters>
                    <MuiLink
                      target={link.attributes.path.options.attributes.target}
                      rel={
                        link.attributes.path.options.attributes.target ===
                        '_blank'
                          ? 'noreferrer'
                          : undefined
                      }
                      component="a"
                      href={link.attributes.path.url.path}
                      underline="hover"
                    >
                      <MuiListItemText
                        primary={link.attributes.label}
                        disableTypography
                      />
                    </MuiLink>
                  </MuiListItem>
                ))}
            </MuiList>
          </MuiGrid>
          <MuiGrid item xs={12} lg={3}>
            <MuiTypography variant="body2" className="copyRight">
              &copy;{year}{' '}
              {isFoundation ? 'Vodafone Foundation' : 'Vodafone Group'}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12} md={12} lg={7}>
            {policyDisclaimerMain.data.map((p) => {
              return (
                <MuiTypography
                  key={p.clientId}
                  variant="body2"
                  className="policyDisclaimer"
                  dangerouslySetInnerHTML={{ __html: p.attributes.content }}
                />
              );
            })}
          </MuiGrid>
        </MuiGrid>
      </MuiContainer>
    </StyledFooter>
  );
}

export default Footer;
