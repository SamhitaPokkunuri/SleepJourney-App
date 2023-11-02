import { useCallback } from 'react';
import { useRouter } from 'next/router';
export const RETURN_HREF_QUERY_PARAM = 'return_href';

export function useOverlayRoute() {
  const router = useRouter();
  const returnHrefQueryParam = router?.query[RETURN_HREF_QUERY_PARAM];
  const watchedQuery = Object.assign({}, router?.query);
  delete watchedQuery[RETURN_HREF_QUERY_PARAM];
  const returnHref = returnHrefQueryParam ?? router?.asPath;

  const queryHash = JSON.stringify(watchedQuery);
  const makeQuerystringHref = useCallback(
    (extraParams) => {
      const params = {
        [RETURN_HREF_QUERY_PARAM]: returnHref,
        ...extraParams,
      };

      const queryString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join('&');

      return `${router?.pathname}?${queryString}`;
    },
    [queryHash, returnHref]
  );

  const handleOverlayClick = (e, isOverlay, url) => {
    if (isOverlay) {
      e.preventDefault();
      router?.push(makeQuerystringHref({ overlay: url }), url, {
        shallow: true,
      });
    }
  };

  return { returnHref, handleOverlayClick };
}
