import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { Image, Link, Icon } from 'components';

const StyledFoundationProgramme = styled(MuiBox)(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    padding: ${theme.spacing(0.5)};
    position: relative;
    box-shadow: ${theme.cards.boxShadow};
    border-radius: 53px;
    transition: background 0.5s;

    &:hover {
      background-color: ${theme.palette.common.red};
      color: ${theme.palette.common.white};

      .endIcon {
        color: ${theme.palette.common.white};
      }
    }

    .media {
      position: relative;
      width: 100;
      height: 100%;
    }

    .title {
      flex: 1;
      display: flex;
      align-items: center;
      font-weight: 900;
      margin: ${theme.spacing(0, 1, 0, 2)};
      font-size: 1.375rem;
      line-height: 1.75rem;

      .endIcon {
        margin-right: ${theme.spacing(1)};
      }
    }

    .endIcon {
      color: ${theme.palette.common.red};
      display: flex;
      margin-left: auto;
    }
  `
);

export default function FoundationProgramme(props) {
  const { image, title, link } = props;
  const { openAs, url, rel, handleOnClick } = link;

  return (
    <StyledFoundationProgramme>
      {image.toggle && (
        <div className="media">
          <Image
            alt={image.alt}
            url={image.url}
            width={100}
            className="is-style-rounded"
            marginBottom={false}
          />
        </div>
      )}
      {title.toggle && (
        <MuiTypography className="title" variant="h4">
          {link.toggle && url ? (
            <Fragment>
              <Link
                backgroundLink
                href={openAs !== 'overlay' ? url : undefined}
                rel={rel}
                target={openAs === 'new-tab' ? '_blank' : undefined}
                onClick={handleOnClick}
              >
                {title.text}
              </Link>
              <span className="endIcon">
                <Icon
                  icon="ChevronRightCircle"
                  iconSet="global"
                  fontSize="small"
                />
              </span>
            </Fragment>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: title.text }} />
          )}
        </MuiTypography>
      )}
    </StyledFoundationProgramme>
  );
}

FoundationProgramme.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    id: PropTypes.number,
    url: PropTypes.string,
    width: PropTypes.number,
  }),
  title: PropTypes.shape({
    toggle: PropTypes.bool,
    text: PropTypes.string,
  }),
  link: PropTypes.shape({
    toggle: PropTypes.bool,
    openAs: PropTypes.string,
    rel: PropTypes.string,
    url: PropTypes.string,
    handleOnClick: PropTypes.func,
  }),
};
