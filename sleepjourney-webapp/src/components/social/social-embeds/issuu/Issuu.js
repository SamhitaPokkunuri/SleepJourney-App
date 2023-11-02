import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';

// Expected response
const placeholder = {
  url: 'https://twitter.com/Interior/status/463440424141459456',
  author_name: 'US Department of the Interior',
  author_url: 'https://twitter.com/Interior',
  html: '<div data-configid="33979641/67542653" style="width: 320px; height: 180px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>',
  width: 550,
  height: null,
  type: 'rich',
  cache_age: '3153600000',
  provider_name: 'Twitter',
  provider_url: 'https://twitter.com',
  version: '1.0',
};

// TO DO: Get working apiKey
const apiKey = '3203851364.d3c8b17.7f80dfecaa4442ccb41847dc64dde172';
const signature = '3203851364.d3c8b17.7f80dfecaa4442ccb41847dc64dde172';
const method = 'issuu.document_embeds.get_html_code';

const StyledIssuu = styled(MuiBox)`
  .twitter-tweet {
    margin: 0 auto;
  }
`;

export default function Issuu({ widthControlExt, url }) {
  const widthStyles = useWidthStyles(widthControlExt);

  const embedURL = `http://api.issuu.com/1_0?apiKey=${apiKey}&signature=${signature}&action=${method}&embedId=${url}&format=json`;
  let newValue = '';

  // Fetch data from API
  fetch(embedURL, {
    method: 'get',
  })
    .then(function (response) {
      // TO DO: test once running at HTTP
      // remove escapes from twitter html string
      newValue = response.html;
      newValue = newValue.replace(/\"/g, '"');
    })
    .catch(function () {
      // Error :(
    });

  // TO DO: remove once setup on HTTP
  // remove escapes from placeholder html string
  newValue = placeholder.html;
  newValue = placeholder.html.replace(/\"/g, '"');

  return (
    <StyledIssuu
      dangerouslySetInnerHTML={{ __html: newValue }}
      sx={{ ...widthStyles }}
    />
  );
}
