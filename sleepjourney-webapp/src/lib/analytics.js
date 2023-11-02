export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
export const TEALIUM_ENV = process.env.NEXT_PUBLIC_TEALIUM_ENV;

// Check if in production
const isProduction =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENABLE_GA === 'true';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (isProduction) {
    if (typeof window !== 'undefined') {
      utag.view();
      gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (isProduction) {
    if (typeof window !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  }
};
