import useSWR from 'swr';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import { Slider } from 'components';
import SocialIcon from 'components/social/social-icons/SocialIcon';
import useWidthStyles from 'utils/useWidthStyles';

const StyledSocialFeed = styled(MuiBox)(
  ({ theme }) => css`
    .socialFeed {
      ${theme.breakpoints.down('sm')} {
        max-width: 480px;
      }
    }

    .feed {
      display: flex;
      margin: ${theme.spacing(0, -0.5, 3)};
    }

    .post {
      padding: ${theme.spacing(0, 0.5, 0.5)};
      flex: 1;
      display: flex !important;
      outline: none;
      align-items: center;

      ${theme.breakpoints.up('md')} {
        max-width: 25%;
      }
    }

    .roundedPost {
      padding: ${theme.spacing(1)};

      .card {
        border-radius: 1000px;
        overflow: visible;
        height: 0;
        padding: 0 0 100%;
        flex: 1;
      }

      .tweet {
        padding: ${theme.spacing(0, 2)};
        font-size: 1rem;
        text-align: center;
        line-height: 1.5rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        ${theme.breakpoints.up('sm')} {
          padding: ${theme.spacing(0, 3)};
        }

        ${theme.breakpoints.up('md')} {
          padding: ${theme.spacing(0, 2)};
        }

        ${theme.breakpoints.up('lg')} {
          padding: ${theme.spacing(0, 3)};
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
      }

      ${theme.breakpoints.up('lg')} {
        padding: ${theme.spacing(0, 3)};
      }

      .tweetText {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        ${theme.breakpoints.down(480)} {
          -webkit-line-clamp: 3;
        }

        ${theme.breakpoints.between('md', 1366)} {
          -webkit-line-clamp: 4;
        }
      }

      .tweetLink {
        color: ${theme.palette.common.red};
      }
    }

    .card {
      border-radius: ${theme.cards.borderRadius};
      box-shadow: ${theme.cards.boxShadow};
      padding: ${theme.spacing(1, 1)};
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;

      & > a {
        margin: 0 5px;
        color: inherit;

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          content: '';
        }
      }
    }

    .instagramPost {
      // Make instagram minHeight - square
      padding-bottom: calc(100% - ${theme.spacing(1)});
      height: 0;
      flex: 1;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      color: ${theme.palette.common.white};

      & > a {
        font-size: 1.75rem !important;
      }
    }

    .twitterPost {
      & > a {
        font-size: 2rem !important;
      }
    }

    .tweet {
      padding: ${theme.spacing(1, 1, 1.5)};

      &:first-of-type {
        margin-top: auto;
        margin-bottom: auto;
        word-break: break-word;
      }

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.5)};
      }
    }

    .heading {
      margin-top: 0;
      margin-left: auto;
      margin-right: auto;
      text-align: center;

      ${theme.breakpoints.up('sm')} {
        max-width: 83.33%;
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 66.66%;
      }
    }

    .tweetText {
      &:before {
        content: '\\201C';
      }

      &:after {
        content: '\\2026 \\201D';
      }
    }

    .tweetLink {
      display: block;

      &:hover {
        text-decoration: none;
      }
    }
  `
);

export default function SocialFeed({
  heading,
  appearance,
  hasInstagram,
  hasTwitter,
  instagramFeed,
  twitterFeed,
  widthControlExt,
}) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  };
  const iuser =
    instagramFeed === 'Vodafone Foundation' ? 'FOUNDATION' : 'GROUP';
  const instagramFunction =
    iuser === 'FOUNDATION' ? 'instagramFdn' : 'instagramGroup';
  // const instagramData = useSWR(`/api/instagram?user=${iuser}`, fetcher).data;
  const instagramData = useSWR(
    `/.netlify/builders/${instagramFunction}`,
    fetcher,
    swrOptions
  ).data;

  const user =
    twitterFeed === 'Vodafone Foundation' ? 'Vodafonefdn' : 'VodafoneGroup';
  const twitterFunction =
    user === 'Vodafonefdn' ? 'twitterFdn' : 'twitterGroup';
  const widthStyles = useWidthStyles(widthControlExt);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isRounded = appearance === 'rounded';
  let twitterData = [];
  // const feed = useSWR(`/api/twitter?user=${user}`, fetcher).data?.statuses;
  const feed = useSWR(
    `/.netlify/builders/${twitterFunction}`,
    fetcher,
    swrOptions
  ).data?.statuses;

  const homeFeed = useSWR(
    !instagramData?.data && twitterFeed !== 'Vodafone Foundation'
      ? '/.netlify/builders/twitterFdn'
      : null,
    fetcher,
    swrOptions
  ).data?.statuses?.slice(0, 2);

  !instagramData?.data && twitterFeed !== 'Vodafone Foundation'
    ? (twitterData = homeFeed?.concat(feed))
    : (twitterData = feed);

  // Determines how many posts to show for each platform
  function getPostCount(hasThis, hasThat) {
    // Has first platform only
    if (hasThis && !hasThat) {
      return 4;
    }
    // Has first and second platforms
    if (hasThis && hasThat) {
      return 2;
    }
    // If first argument is false we...
    return 0;
  }

  const instagramPosts = instagramData?.data
    ? instagramData?.data
        .slice(0, getPostCount(hasInstagram, hasTwitter))
        .map(({ id, media_url, permalink, thumbnail_url }) => (
          <MuiBox
            key={id}
            className={clsx('post', {
              roundedPost: isRounded,
            })}
          >
            <MuiCard
              key={id}
              className={clsx('card', 'instagramPost')}
              style={{
                backgroundImage: `url(${
                  thumbnail_url ? thumbnail_url : media_url
                })`,
              }}
            >
              <SocialIcon
                platform="instagram"
                style={isRounded ? 'is-style-brand' : 'default'}
                fontSize={isRounded ? 'inherit' : 'medium'}
                elevated={isRounded}
                href={permalink}
              />
            </MuiCard>
          </MuiBox>
        ))
    : [];

  const twitterPosts = twitterData
    ? twitterData
        .slice(0, getPostCount(hasTwitter, hasInstagram && instagramData?.data))
        .filter((i) => i)
        .map((tweet) => {
          const { id, id_str, text, user } = tweet;
          // Split at ellipsis
          const splitText = text.split(/\u2026/);
          const tweetText = splitText[0];
          const tweetLink = `https://twitter.com/${user.screen_name}/status/${id_str}`;

          return (
            <MuiBox
              key={id}
              className={clsx('post', {
                roundedPost: isRounded,
              })}
            >
              <MuiCard key={id} className={clsx('card', 'twitterPost')}>
                <SocialIcon
                  platform="twitter"
                  style={isRounded ? 'is-style-brand' : 'default'}
                  fontSize={isRounded ? 'inherit' : 'medium'}
                  elevated={isRounded}
                  href={tweetLink}
                />
                <MuiTypography className="tweet" variant="body1">
                  <span className="tweetText">{tweetText}</span>
                  <a
                    className="tweetLink"
                    href={tweetLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read more
                  </a>
                </MuiTypography>
              </MuiCard>
            </MuiBox>
          );
        })
    : [];

  return (
    <StyledSocialFeed sx={{ ...widthStyles }}>
      <MuiContainer className="socialFeed">
        {heading && (
          <MuiTypography className="heading" variant="h2">
            {heading}
          </MuiTypography>
        )}
        {isMobile ? (
          <Slider
            slidesToShow={2}
            slidesToScroll={2}
            arrows={true}
            flex={true}
            responsive={[
              {
                breakpoint: theme.breakpoints.values.sm,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              },
            ]}
          >
            {instagramPosts
              ? instagramPosts.concat(twitterPosts)
              : twitterPosts}
          </Slider>
        ) : (
          <MuiBox className="feed">
            {instagramPosts
              ? instagramPosts.concat(twitterPosts)
              : twitterPosts}
          </MuiBox>
        )}
      </MuiContainer>
    </StyledSocialFeed>
  );
}
