import { signOut, getSession } from 'next-auth/client';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function SignOut() {
  return (
    <>
      <style global jsx>
        {`
          body {
            background-color: rgb(230, 0, 0) !important;
            color: white;
          }
          .text {
            color: white;
            text-align: center;
          }
          .login {
            color: black;
            overflow: hidden;
            padding: 40px 30px 30px 30px;
            border-radius: 10px;
            margin: 0 auto;
            position: relative;
            width: 400px;
          }
          .login > button {
            font-family: 'Asap', sans-serif;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            text-transform: uppercase;
            width: 180px;
            border: 0;
            padding: 10px 0;
            display: block;
            margin: 0 auto;
            border-radius: 5px;
            background-color: #f45b69;
            -webkit-transition: background-color 300ms;
            -moz-transition: background-color 300ms;
            transition: background-color 300ms;
          }
          .login > button:hover {
            background-color: #f24353;
          }
        `}
      </style>
      <div className={'login'}>
        <h1 className={'text'}>Do you want to leave?</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </>
  );
}
