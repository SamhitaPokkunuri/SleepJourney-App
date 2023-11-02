import { getSession } from 'next-auth/client';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const siteUrl = process.env.SITE_URL;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${siteUrl}/brand/living-speechmark-generator`,
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function SpeechMark() {
  return (
    <>
      <Head>
        <title>VF Generator Tool</title>
        <script
          type="text/javascript"
          defer
          src="https://unpkg.com/h264-mp4-encoder/embuild/dist/h264-mp4-encoder.web.js"
        />
        <script
          type="text/javascript"
          defer
          src="https://cdn.jsdelivr.net/quicksettings/latest/quicksettings.min.js"
        />
        <script type="text/javascript" defer src="main.min.js" />
        <style>
          {`body{padding:0;margin:0;height:100%}.selectDisable{-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;pointer-events:none}.qs_content{background-color:#00000000!important}.qs_container{background-color:#00000000!important;margin:0!important;padding:3px!important}.qs_main{box-shadow:0 0 0 rgb(0 0 0 / 0%)!important}.switch{position:relative;display:inline-block;width:40px;height:24px;display:none}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#fff}.slider:before{position:absolute;content:\"\";height:16px;width:16px;left:4px;bottom:4px;background-color:#e60000;-webkit-transition:.1s;transition:.1s}.slider.inactive:before{background-color:#d2d2d2}input:checked+.slider:before{background-color:#fff!important}input:checked+.slider{background-color:#e60000}input:focus+.slider{box-shadow:0 0 1px #2196f3}input:checked+.slider.inactive{background-color:#d2d2d2!important}input:checked+.slider:before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}#canvas{display:block;padding:0;margin:0;height:100%}input[type=range]{-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:4px;cursor:pointer;animate:.2s;box-shadow:0 0 0 #000;border-radius:0;border:0 solid #000}input[type=range]::-webkit-slider-thumb{box-shadow:0 0 0 rgb(195 195 195);border:0 solid #000;height:15px;width:15px;border-radius:25px;background:#fffFFF00;cursor:pointer;-webkit-appearance:none;margin-top:-5.5px}input[type=range]::-moz-range-track{width:100%;height:4px;cursor:pointer;animate:.2s;box-shadow:0 0 0 #000;border-radius:0;border:0 solid #000}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 3px rgb(195 195 195);border:0 solid #000;height:15px;width:15px;border-radius:25px;background:#fffFFF00;cursor:pointer}input[type=range]::-ms-track{width:100%;height:4px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-thumb{box-shadow:1px 1px 3px rgb(195 195 195)!important;border:0 solid #000;height:15px;width:15px;border-radius:250px;background:#fffFFF00;cursor:pointer}#input_code{font-family:vodafone_font;font-size:16px;padding:8px 25px 8px 8px;width:140px;font-size:11px;border-width:0;border-color:#ccc;background-color:#fff;color:#000;border-style:solid;border-radius:14px;box-shadow:-50px 0 0 rgba(66,66,66,0);text-shadow:-50px 0 0 rgba(66,66,66,0)}#input_code:focus{outline:0}input.formInvalid::-webkit-input-placeholder{color:red!important}input.formInvalid:-moz-placeholder{color:red!important}input.formInvalid::-moz-placeholder{color:red!important}input.formInvalid:-ms-input-placeholder{color:red!important}#enter_id_button{background-color:transparent;display:inline-block;cursor:pointer;color:#fff;font-family:vodafone_font;font-size:17px;padding:0 0;text-decoration:none;border-color:transparent}#enter_id_button:hover{background-color:transparent}#enter_id_button:active{position:relative;top:1px}.select{position:relative;display:inline-block;margin-bottom:15px;width:200px;height:25px}.select select{font-family:vodafone_font;display:inline-block;width:100%;height:25px;cursor:pointer;padding:0 80px;outline:0;border:0 solid #000;border-radius:5px;background:#fff;color:#000;appearance:none;-webkit-appearance:none;-moz-appearance:none}.select select::-ms-expand{display:none}.select select:focus,.select select:hover{color:#000;background:#fff}.select select:disabled{opacity:.1;pointer-events:none}.select_arrow{position:absolute;top:7px;right:15px;width:0;height:0;border:solid #7b7b7b;border-width:0 3px 3px 0;display:inline-block;padding:3px;transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dropdown-content{display:none;position:absolute;background-color:#f1f1f1;min-width:160px;overflow:auto;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);right:0;z-index:1}.select select:focus~.select_arrow,.select select:hover~.select_arrow{border-color:#000}.select select:disabled~.select_arrow{border-top-color:#ccc}@font-face{font-family:vodafone_font;src:url('assets/UI/Font/Vodafone Font RgBd.ttf') format('truetype')}@font-face{font-family:vodafone_font_light;src:url('assets/UI/Font/Vodafone Font Lt.ttf') format('truetype')}#custom_tooltip{position:relative;cursor:pointer}#custom_tooltip:after,#custom_tooltip:before{font-family:vodafone_font;line-height:1;font-size:.9em;pointer-events:none;position:absolute;box-sizing:border-box;display:none;opacity:0}#custom_tooltip:before{content:\"\";border:5px solid transparent;z-index:100}#custom_tooltip:after{content:\"testme\";text-align:center;min-width:3em;max-width:21em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:6px 8px;border-radius:3px;background:#fff;color:#a6a6a6;z-index:99;filter:drop-shadow(0 0 1px #a6a6a6)}#custom_tooltip:hover:after,#custom_tooltip:hover:before{display:block;opacity:1}#custom_tooltip:not([data-flow])::before,#custom_tooltip[data-flow=top]::before{bottom:100%;border-bottom-width:0;border-top-color:#fff;filter:drop-shadow(0 1px 0 #a6a6a6)}#custom_tooltip:not([data-flow])::after,#custom_tooltip[data-flow=top]::after{bottom:calc(100% + 5px)}#custom_tooltip:not([data-flow])::before,#custom_tooltip[data-flow=top]::after,#custom_tooltip[data-flow=top]::before,[tooltip]:not([data-flow])::after{left:50%;-webkit-transform:translate(-50%,-4px);transform:translate(-50%,-4px)}`}
        </style>
      </Head>
      <main />
      <label className="switch" id="switch_color">
        <input type="checkbox" />
        <span className="slider round" />
      </label>
      <input
        type="text"
        id="input_code"
        placeholder="Unique ID"
        style={{ display: 'none' }}
      />
      <button id="enter_id_button" style={{ display: 'none' }}>
        <img src="enter_id_button.png" alt="image-button" />
      </button>
    </>
  );
}
