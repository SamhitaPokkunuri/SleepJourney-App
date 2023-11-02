import { getSession, getCsrfToken } from 'next-auth/client';

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);
  const siteUrl = process.env.SITE_URL;
  if (session) {
    return {
      redirect: {
        destination: '/brand/living-speechmark-generator',
        permanent: false,
      },
    };
  }
  return {
    props: { token: csrfToken, url: siteUrl },
  };
}

export default function SignIn({ token, url }) {
  return (
    <>
      <style global jsx>
        {`
          body {
            background-color: rgb(230, 0, 0) !important;
            color: white;
          }
          .text {
            padding-top: 15%;
            color: white;
            top: 25%;
            left: 30%;
            text-align: center;
          }
          .text > h1 {
            font-size: 60px;
            font-weight: 800;
          }
          .login {
            color: black;
            overflow: hidden;
            padding: 40px 30px 30px 30px;
            position: relative;
            width: 400px;
            text-align: center;
            margin: 0 auto 0 auto;
          }

          .login > input {
            display: block;
            border-radius: 5px;
            font-size: 16px;
            background: white;
            width: 100%;
            border: 0;
            padding: 10px 10px;
            margin: 15px 0px;
          }
          .login > button {
            width: 100%;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            text-transform: uppercase;
            border: 0;
            padding: 10px 0;
            margin-top: 10px;
            border-radius: 5px;
            box-shadow: 2px 3px 6px #9b0404;
            background-color: rgb(230, 0, 0);
            -webkit-transition: background-color 300ms;
            -moz-transition: background-color 300ms;
            transition: background-color 300ms;
          }
          .login > button:hover {
            background-color: #f24353;
          }
        `}
      </style>
      <div className={'text'}>
        <h1>Welcome to Creative Tool</h1>
        <h2>Together we can make the world, a more creative place.</h2>
      </div>
      <form method="post" action="/api/auth/signin/email" className={'login'}>
        <input name="csrfToken" type="hidden" defaultValue={token} />
        <input
          name="callbackUrl"
          type="hidden"
          defaultValue={`${url}/brand/living-speechmark-generator`}
        />
        <input type="email" id="email" name="email" placeholder={'Email'} />
        <button type="submit">Request Login</button>
      </form>
    </>
  );
}
