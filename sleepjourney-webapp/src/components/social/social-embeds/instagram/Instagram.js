import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';

// Expected response
const placeholder = {
  version: '1.0',
  author_name: 'diegoquinteiro',
  provider_name: 'Instagram',
  provider_url: 'https://www.instagram.com/',
  type: 'rich',
  width: 658,
  html: '<blockquote class="instagram-media" data-instgrm-version="2"><div style="padding:8px;"><div style=" background:#000000; line-height:0; margin-top:40px; padding-bottom:55%; padding-top:45%; text-align:center; width:100%;"><div style="position:relative;"><div style=" -webkit-animation:dkaXkpbBxI 1s ease-out infinite; animation:dkaXkpbBxI 1s ease-out infinite; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-44px; width:44px;"></div><span style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:12px; font-style:normal; font-weight:bold; position:relative; top:15px;">Loading</span></div></div><p style=" line-height:32px; margin-bottom:0; margin-top:8px; padding:0; text-align:center;"> <a href="https://instagram.com/p/bGsVE-pHUn/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; text-decoration:none;" target="_top"> View on Instagram</a></p></div></blockquote><script async defer src="//platform.instagram.com/en_US/embeds.js"></script>',
  thumbnail_width: 640,
  thumbnail_height: 640,
};

// TODO: Get working access_token
// placeholder access token for VDF Group
const accessToken = '3203851364.d3c8b17.7f80dfecaa4442ccb41847dc64dde172';

const StyledInstagram = styled(MuiBox)(
  ({ theme }) => css`
    .instagram-media {
      width: 100%;
      max-width: 550px;
      min-height: 400px;
      border-radius: ${theme.cards.borderRadius} !important;
      border: ${theme.cards.border} !important;
      box-shadow: ${theme.cards.boxShadow} !important;
      margin: 0 auto !important;
    }
  `
);

export default function Instagram({ widthControlExt, url }) {
  const widthStyles = useWidthStyles(widthControlExt);

  const embedURL = `https://graph.facebook.com/v8.0/instagram_oembed?url=${url}&access_token=${accessToken}`;
  let newValue = '';

  // Fetch data from API
  fetch(embedURL, {
    method: 'get',
  })
    .then(function (response) {
      // TODO: test once running at HTTP
      // remove escapes from instagram html string
      newValue = response.html;
      newValue = newValue.replace(/\"/g, '"');
    })
    .catch(function () {
      // Error :(
    });

  // TODO: remove once setup on HTTP
  // remove escapes from placeholder html string
  newValue = placeholder.html;
  newValue = placeholder.html.replace(/\"/g, '"');

  return (
    <StyledInstagram
      dangerouslySetInnerHTML={{ __html: newValue }}
      sx={{ ...widthStyles }}
    />
  );
}
