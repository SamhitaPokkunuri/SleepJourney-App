import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

import { NavigationLink } from 'components';
import { selectUiByKey, updateMainMenu } from 'lib/slices/uiSlice';

const StyledNavigationList = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.common.white};
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.5rem;
    flex: 1;
    min-height: 0;
    transition-timing-function: ease;
    transition-duration: 250ms;

    ${theme.breakpoints.down('md')} {
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      transition-property: transform;
    }

    .navigationList {
      position: absolute;
      width: 100%;
      left: 0;

      ${theme.breakpoints.down('md')} {
        top: 0;
        bottom: 0;
        z-index: 1;
        transform: translateX(100%);

        &.expanded {
          transform: translateX(0);
        }
      }

      ${theme.breakpoints.up('md')} {
        opacity: 0;
        visibility: hidden;

        &.expanded {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .list {
      position: static;
      margin: 0;
      padding: ${theme.spacing(2.5, 0)};
      font-size: inherit;
      line-height: inherit;

      ${theme.breakpoints.up('md')} {
        padding: 0 8px 0 16px;
        display: flex;
      }

      ${theme.breakpoints.up('lg')} {
        padding: ${theme.spacing(0, 0, 0, 2.4)};
      }
    }

    .listItem {
      padding: 0;
      flex-wrap: wrap;
      width: auto;
      flex-grow: 1;
      position: static;
      align-items: stretch;
    }

    &[data-level='1'] {
      ${theme.breakpoints.up('md')} {
        font-weight: 300;
        display: flex;
        font-size: 1.375rem;

        > .listContainer {
          display: flex;
          flex: 1;

          > .list {
            flex: 1;
          }
        }
      }

      ${theme.breakpoints.up('xxl')} {
        font-size: 1.5rem;
      }
    }

    &[data-level='2'] {
      ${theme.breakpoints.up('md')} {
        z-index: -1;
        top: 100%;
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
        padding: ${theme.spacing(0, 3.2)};
        transition-property: min-height;

        &.animating {
          transition-property: opacity, visibility;
        }

        &.expanded .breadcrumbs {
          transform: translateX(100%);
          opacity: 1;
          visibility: visible;
        }

        .navigationList {
          top: 0;
          background-color: transparent;
          transform: translateX(125%);
          transition-property: transform, opacity, visibility;

          &.expanded {
            transform: translateX(100%);
          }
        }

        > .listContainer {
          margin: 0 auto;
          max-width: ${theme.containers.values.xl}px;

          > .list {
            width: 33.33%;
            padding: ${theme.spacing(2, 4, 2.5, 0)};
          }
        }

        .list {
          flex-direction: column;
          position: relative;
          width: 100%;
        }

        .listItem {
          padding: 2px 0;
        }
      }

      ${theme.breakpoints.up('xl')} {
        padding: ${theme.spacing(0, 4.8)};
      }

      ${theme.breakpoints.up('xxl')} {
        padding: ${theme.spacing(0, 6)};
      }
    }

    &[data-level='3'] {
      ${theme.breakpoints.up('md')} {
        > .listContainer {
          > .list {
            padding: ${theme.spacing(2, 2, 2.5, 2)};
          }
        }
      }
    }

    &[data-level='4'] {
      ${theme.breakpoints.up('md')} {
        > .listContainer {
          > .list {
            padding: ${theme.spacing(2, 0, 2.5, 4)};
          }
        }
      }
    }
  `
);

function isActiveLink(path, currentPath, level) {
  const newRegExp = new RegExp(path);
  const splitPath = path.split('/')[level + 1];
  const splitCurrentPath = currentPath?.split('/')[level + 1];
  return newRegExp.test(currentPath) && splitPath === splitCurrentPath;
}

export default function NavigationList(props) {
  const {
    data = [],
    dataLevel = 0,
    parentId = null,
    goToLink = null,
    active = false,
  } = props;
  const listRef = useRef(null);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const { breadcrumbs, expanded, heights, desktopDrawerOpen, isAnimating } =
    useSelector(selectUiByKey('mainMenu'));
  const dispatch = useDispatch();
  const { asPath } = useRouter();

  useEffect(() => {
    if (active) {
      dispatch(
        updateMainMenu({
          breadcrumbs: parentId,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  const handleOnClick = (id, level, hasPopup, selected) => (e) => {
    if (hasPopup && !selected) {
      e.preventDefault();

      const menu = level > expanded.length ? breadcrumbs : expanded;
      const menuItems = [...menu];
      menuItems.splice(level, expanded.length, id);
      const drawerAnimation =
        !isMobile && (expanded[0] === id || !desktopDrawerOpen);

      dispatch(
        updateMainMenu({
          isAnimating: drawerAnimation,
          desktopDrawerOpen: !isMobile && expanded[0] !== id,
          expanded: expanded[0] === id ? [] : menuItems,
          heights: [],
        })
      );

      if (drawerAnimation) {
        setTimeout(() => {
          dispatch(updateMainMenu({ isAnimating: false }));
        }, 1000);
      }
    }
  };

  const mobileExpanded = isMobile && expanded.indexOf(parentId) > -1;
  const desktopExpanded = !isMobile && expanded.indexOf(parentId) > -1;
  const breadcrumbsExpanded =
    !isMobile && breadcrumbs.indexOf(parentId) > -1 && expanded.length < 2;

  const expandedDrawer = breadcrumbs[0] !== expanded[0] && desktopExpanded;
  const expandedBreadcrumbDrawer =
    breadcrumbs[0] === expanded[0] && (desktopExpanded || breadcrumbsExpanded);

  useEffect(() => {
    if (expandedDrawer || expandedBreadcrumbDrawer) {
      dispatch(
        updateMainMenu({
          heights: listRef.current.getBoundingClientRect().height,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, asPath]);

  function getMinHeight(array) {
    return array.length > 0 ? Math.max(...array) : undefined;
  }

  const minHeight = dataLevel === 1 ? getMinHeight(heights) : undefined;

  return (
    <StyledNavigationList
      component="div"
      data-level={dataLevel + 1}
      className={clsx('navigationList', {
        expanded: mobileExpanded || desktopExpanded,
        breadcrumbs: breadcrumbsExpanded,
        animating: dataLevel === 1 && isAnimating,
      })}
      style={{ minHeight }}
    >
      <MuiBox ref={listRef} className="listContainer">
        <MuiList className="list" disablePadding>
          {goToLink && (
            <MuiListItem className="listItem" aria-haspopup={false}>
              {goToLink}
            </MuiListItem>
          )}
          {data.map(({ attributes }, index) => {
            const { id, children, path, label } = attributes;
            const hasPopup = children?.length > 0;
            const selected = expanded.indexOf(id) > -1;
            const active = isActiveLink(path.url.path, asPath, dataLevel);

            return (
              <MuiListItem
                key={id}
                className="listItem"
                aria-haspopup={hasPopup}
              >
                <NavigationLink
                  selected={selected}
                  active={active}
                  path={path}
                  label={label}
                  endLink={dataLevel === 0 && data.length - 1 === index}
                  hasPopup={hasPopup}
                  onClick={handleOnClick(id, dataLevel, hasPopup, selected)}
                />
                {hasPopup && (
                  <NavigationList
                    data={children}
                    dataLevel={dataLevel + 1}
                    parentId={id}
                    active={active}
                    goToLink={
                      <NavigationLink
                        path={path}
                        goToLink
                        label={
                          <span>
                            Go to <b>{label}</b>
                          </span>
                        }
                      />
                    }
                  />
                )}
              </MuiListItem>
            );
          })}
        </MuiList>
      </MuiBox>
    </StyledNavigationList>
  );
}
