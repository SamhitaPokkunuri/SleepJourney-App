import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

import { selectUiByKey, updateInpageNavigation } from 'lib/slices/uiSlice';

const StyledInpageNavigation = styled(MuiBox)(
  ({ theme }) => css`
    width: 100%;
    z-index: 9;
    text-align: center;
    background: ${theme.palette.common.darkGrey};
    display: flex;
    overflow-x: auto;

    ${theme.breakpoints.up('xl')} {
      padding: ${theme.spacing(0, 1.6)};
    }

    ${theme.breakpoints.up('xxl')} {
      padding: ${theme.spacing(0, 2.8)};
    }

    &.stickyNavigation {
      position: fixed;
      top: 48px;

      ${theme.breakpoints.up('sm')} {
        top: 60px;
      }

      ${theme.breakpoints.up('md')} {
        top: 72px;
      }
    }

    .list {
      color: ${theme.palette.common.white};
      display: flex;
      align-items: center;
      max-width: 100%;
      z-index: 1;
      line-height: 1.125rem;
      margin: ${theme.spacing(0, 'auto')};
      padding: ${theme.spacing(1.2, 0)};

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.8, 0)};
      }
    }

    .listItem {
      padding: 0;

      &:not(:first-of-type) {
        border-left: 2px solid ${theme.palette.common.white};
      }
    }
  `
);

export default function InpageNavigation(props) {
  const { children } = props;
  const { isSticky } = useSelector(selectUiByKey('inpageNavigation'));
  const dispatch = useDispatch();
  const stickyEl = useRef(null);
  const distanceFromTop = useRef(0);

  useEffect(() => {
    distanceFromTop.current = stickyEl.current.offsetTop;
  }, []);

  useEffect(() => {
    const navHeight = document.getElementsByTagName('header')[0]?.offsetHeight;

    const scrollable = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY + navHeight >= distanceFromTop.current && !isSticky) {
        dispatch(
          updateInpageNavigation({
            isSticky: true,
          })
        );
      }
      if (currentScrollY + navHeight < distanceFromTop.current && isSticky) {
        dispatch(
          updateInpageNavigation({
            isSticky: false,
          })
        );
      }
    };

    window.addEventListener('scroll', scrollable);

    return () => {
      window.removeEventListener('scroll', scrollable);
    };
  }, [isSticky, dispatch]);

  return (
    <StyledInpageNavigation
      ref={stickyEl}
      className={clsx({
        stickyNavigation: isSticky,
      })}
    >
      <MuiList className="list">
        {children.map((child) => (
          <MuiListItem key={child.key} className="listItem">
            {child}
          </MuiListItem>
        ))}
      </MuiList>
    </StyledInpageNavigation>
  );
}
