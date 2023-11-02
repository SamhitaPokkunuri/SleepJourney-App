import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';

const StyledHtml = styled(MuiBox)(
  ({ theme }) => css`
    color: inherit;

    label {
      span.red-text,
      span.required {
        color: ${theme.palette.common.red};
      }
    }

    input[type='text'],
    input[type='email'],
    input[type='number'] {
      background-color: ${theme.palette.common.white};
      width: 100%;
      border: 2px solid ${theme.palette.common.spanishGrey};
      min-height: 1.1876em;
      min-width: 100px;
      margin: ${theme.spacing(1, 0, 2)};
      display: block;
      padding: ${theme.spacing(1.6)};
      background: none;
      animation-name: mui-auto-fill-cancel;
      letter-spacing: inherit;
      animation-duration: 10ms;

      &:focus {
        border-color: #00b0ca;
        border-width: 2px;
        outline: none;
      }

      &.mce_inline_error {
        border-color: ${theme.palette.common.red};
      }
    }

    input[type='checkbox'] {
      margin: ${theme.spacing(0, 1, 0, 0)};

      &.mce_inline_error {
        border-color: ${theme.palette.common.red};
      }
    }

    button {
      color: ${theme.palette.common.white};
      background-color: ${theme.palette.common.red};
      border: 0;
      border-radius: 2px;
      cursor: pointer;
      margin: 0;
      display: block;
      outline: 0;
      user-select: none;
      text-decoration: none;
      margin-top: ${theme.spacing(4)};
      box-shadow: none;
      fontfamily: VodafoneRegular, Arial, sans-serif;
      font-weight: 700;
      min-height: 48px;
      line-height: 1.25rem;
      padding: 10px 16px;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      justify-content: space-between;
      min-width: 150px;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.125rem;
        padding: 16px 20px;
        min-height: 56px;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.25rem;
      }

      &[disabled='disabled'] {
        cursor: default;
        background-color: ${theme.palette.common.silver};
      }

      &:hover {
        background-color: ${theme.palette.common.white};
        color: ${theme.palette.common.darkGrey};
      }
    }

    div.mce_inline_error {
      color: ${theme.palette.common.red};
    }

    input + div.mce_inline_error {
      transform: translateY(-15px);
    }

    #mce-success-response,
    #mce-error-response {
      margin-top: ${theme.spacing(4)};
      text-align: center;
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 300;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.5rem;
        line-height: 1.875rem;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.75rem;
        line-height: 2.125rem;
      }
    }
  `
);

export default function Html(props) {
  const { content, widthControlExt } = props;
  const widthStyles = useWidthStyles(widthControlExt);

  return (
    <StyledHtml
      dangerouslySetInnerHTML={{ __html: content }}
      sx={{ ...widthStyles }}
    />
  );
}
