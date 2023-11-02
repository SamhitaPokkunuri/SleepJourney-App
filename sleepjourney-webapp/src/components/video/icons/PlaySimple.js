import * as React from 'react';

function SvgPlaySimple(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 640"
      {...props}
    >
      <defs>
        <path
          d="M165.07 117.99v402.5c0 18.59 14.52 33.78 32.84 34.85h.1c.37.02.81.03 1.25.03 7.78 0 14.95-2.62 20.68-7.01-.01 0-.03.02-.08.06l4.81-3.47C383.53 426.83 471.78 361.2 489.43 348.07c9.12-6.08 15.05-16.32 15.05-27.95 0-11.73-6.04-22.05-15.17-28.03a.605.605 0 00-.13-.08l-7.3-5.51C328.12 172.11 242.69 108.57 225.61 95.86c-10.67-8.77-23.93-15.17-39.38-8.38-12.6 5.94-21.16 18.54-21.16 33.14v2.98-5.61z"
          id="play-simple_svg__a"
        />
      </defs>
      <use xlinkHref="#play-simple_svg__a" fill="#fff" />
      <use
        xlinkHref="#play-simple_svg__a"
        fillOpacity={0}
        stroke="#000"
        strokeOpacity={0}
      />
    </svg>
  );
}

export default SvgPlaySimple;
