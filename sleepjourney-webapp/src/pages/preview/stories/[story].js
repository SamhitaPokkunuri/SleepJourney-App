// Vendor and internal dependencies
import Head from 'next/head';
import parse from 'html-react-parser';
import { getPreviewPathBlocks } from 'lib/graphql/getPreviewPathBlocks';
import validateAndParseJSON from 'utils/validateAndParseJSON';
import { GA_TRACKING_ID } from 'lib/analytics';

export const config = { amp: true };

export default function PreviewStory(props) {
  const { bodyJson, title } = props;
  const debug = false;
  const gtagObj = `
          <amp-analytics type="gtag" data-credentials="include">
          <script
            type="application/json"
          />
          {
            "vars" : {
              "gtag_id": "${GA_TRACKING_ID}",
              "config" : {
                "${GA_TRACKING_ID}": { "groups": "default", "page_title" : "${title}" }
              }
            }
          }</amp-analytics></amp-story>`;

  const parsedJson = validateAndParseJSON(bodyJson);
  const body = parsedJson.content.replace('</amp-story>', gtagObj);
  const parsedContent = debug ? parse(body) : parse(parsedJson.content);

  const stylesheets = parsedContent.props.children[0].props.children.filter(
    (item) => item.props.rel === 'stylesheet'
  );
  const link = parsedContent.props.children[0].props.children.filter(
    (item) => item.props.rel === 'canonical'
  );

  return (
    <>
      <Head>
        {stylesheets}
        {link}
        {debug && (
          // AMP - Google Analytics
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          ></script>
        )}
      </Head>
      <style global jsx>
        {`
          amp-story-page {
            background-color: #131516;
          }

          amp-story-grid-layer {
            overflow: visible;
          }

          @media (max-aspect-ratio: 9 / 16) {
            @media (min-aspect-ratio: 320 / 678) {
              amp-story-grid-layer.grid-layer {
                margin-top: calc((100% / 0.5625 - 100% / 0.6666666666666666) / 2);
              }
            }
          }

          .page-fullbleed-area,
          .page-background-overlay-area {
            position: absolute;
            overflow: hidden;
            width: 100%;
            left: 0;
            height: calc(1.1851851851851851 * 100%);
            top: calc((1 - 1.1851851851851851) * 100% / 2);
          }

          .page-safe-area {
            overflow: visible;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: calc(0.84375 * 100%);
            margin: auto 0;
          }

          .mask {
            position: absolute;
            overflow: hidden;
          }

          .fill {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
          }
          @font-face {
            font-family: VodafoneIcons;
            font-style: normal;
            font-display: auto;
            font-weight: 400;
            src: local('VodafoneIcons'), url('/fonts/vodafone-icons.woff') format('woff');
          }
          @font-face {
            font-family: VodafoneRegular;
            font-style: normal;
            font-display: auto;
            font-weight: 300;
            src: local('VodafoneLight'), url('/fonts/vodafone-light.woff') format('woff');
          }
          @font-face {
            font-family: VodafoneRegular;
            font-style: normal;
            font-display: auto;
            font-weight: 400;
            src: local('VodafoneRegular'), url('/fonts/vodafone-regular.woff') format('woff');
          }
          @font-face {
            font-family: VodafoneRegular;
            font-style: normal;
            font-display: auto;
            font-weight: 700;
            src: local('VodafoneBold'), url('/fonts/vodafone-bold.woff') format('woff');
          }

          @font-face {
            font-family: VodafoneRegular;
            font-style: normal;
            font-display: auto;
            font-weight: 900;
            src: local('VodafoneBlack'), url('/fonts/vodafone-black.woff') format('woff');
          }
        `}
      </style>
      {parsedContent.props.children[1].props.children}
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await getPreviewPathBlocks(context.params.story);

  if (data) {
    return {
      props: data,
    };
  }

  return {
    notFound: true,
  };
}
