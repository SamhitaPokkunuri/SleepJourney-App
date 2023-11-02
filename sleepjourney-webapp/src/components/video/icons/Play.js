import * as React from 'react';

function SvgPlay(props) {
  return (
    <svg
      data-name="Apps_ic"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
      {...props}
    >
      <defs>
        <linearGradient
          id="play_svg__b"
          x1={321.52}
          y1={-1277.6}
          x2={321.52}
          y2={-1210.41}
          gradientTransform="matrix(.56 -.56 .71 .71 825.43 1191.62)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
        <clipPath id="play_svg__a">
          <rect
            x={16}
            y={16}
            width={160}
            height={160}
            rx={80}
            ry={80}
            fill="none"
          />
        </clipPath>
      </defs>
      <g data-name="Apps_ic_hi">
        <g data-name="Bill_ic_hi">
          <g data-name="Report_ic_hi">
            <g data-name="vodafone_store_ic_hi">
              <g data-name="Broadband_ic_hi">
                <path fill="none" d="M0 0h192v192H0z" />
                <rect
                  x={16}
                  y={16}
                  width={160}
                  height={160}
                  rx={80}
                  ry={80}
                  fill="#fff"
                />
                <path
                  d="M96 174a80.23 80.23 0 01-80-79v1a80.24 80.24 0 0080 80 80.24 80.24 0 0080-80v-1a80.23 80.23 0 01-80 79z"
                  opacity={0.06}
                />
                <g clipPath="url(#play_svg__a)">
                  <path
                    opacity={0.2}
                    fill="url(#play_svg__b)"
                    d="M175.63 129.63l-55.23 55.24-47.51-47.51 65.36-45.11 37.38 37.38z"
                  />
                </g>
                <path
                  d="M135 89.17L86.41 53c-3.13-2.57-6.27-3.18-9.35-1.83A8.69 8.69 0 0072 58.78a2 2 0 000 .22v74a8.47 8.47 0 008 8.53h.24a8.32 8.32 0 005.08-1.73l.86-.64 47.51-35.32 1.36-1a8.18 8.18 0 00-.05-13.67z"
                  fill="#e60000"
                />
                <path
                  d="M135.07 100.3l-1.36 1-47.51 35.34-.86.64a8.32 8.32 0 01-5.08 1.72H80a8.47 8.47 0 01-8-8.53V133a8.47 8.47 0 008 8.53h.24a8.32 8.32 0 005.08-1.73l.86-.64 47.51-35.32 1.36-1a8.07 8.07 0 003.52-8 8.19 8.19 0 01-3.5 5.46z"
                  opacity={0.12}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgPlay;
