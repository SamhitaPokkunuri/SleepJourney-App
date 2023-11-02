import { getCsrfToken, getSession } from 'next-auth/client';
import AWS from 'aws-sdk';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const csrfToken = await getCsrfToken(context);
  AWS.config.update({
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    region: process.env.NEXT_AUTH_AWS_REGION,
  });
  const client = new AWS.DynamoDB.DocumentClient();
  const TableName = process.env.NEXTAUTH_TABLE;
  const getSessionData = await client
    .scan({
      TableName,
      FilterExpression: '#b= :a',
      ExpressionAttributeValues: {
        ':a': 'SESSION',
      },
      ExpressionAttributeNames: {
        '#b': 'type',
      },
    })
    .promise();

  const getUserData = await client
    .scan({
      TableName,
      FilterExpression: '#b= :a',
      ExpressionAttributeValues: {
        ':a': 'USER',
      },
      ExpressionAttributeNames: {
        '#b': 'type',
      },
    })
    .promise();

  if (!session && session?.user.email !== process.env.NEXTAUTH_ADMIN) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: getUserData.Items,
      session: getSessionData.Items,
      csrfToken,
    },
  };
}

export default function Admin({ user, session }) {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  return (
    <>
      <style global jsx>
        {`
          body {
            background-color: rgb(230, 0, 0) !important;
            color: white !important;
            padding: 5%;
          }
          table {
            border-spacing: 0;
            border: 1px solid white;
            color: white;
          }

          tr:last-child > td {
            border-bottom: 0;
          }

          th,
          td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid white;
            border-right: 1px solid white;
          }
          td > button {
            font-family: 'Asap', sans-serif;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            text-transform: uppercase;
            width: 120px;
            border: 0;
            padding: 10px 0;
            border-radius: 5px;
            background-color: #f45b69;
            -webkit-transition: background-color 300ms;
            -moz-transition: background-color 300ms;
            transition: background-color 300ms;
          }
          td > button:hover {
            background-color: #f24353;
          }
          .login > input {
            border-radius: 5px;
            font-size: 16px;
            background: white;
            border: 0;
            padding: 10px 10px;
            margin: 15px 10px;
          }
          .login > button {
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            text-transform: uppercase;
            border: 0;
            padding: 10px 0;
            width: 100px;
            margin: 10px;
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
      <div className={'login'}>
        <h1>Active Sessions</h1>
        <table>
          <thead>
            <tr>
              <th>user id</th>
              <th>token</th>
              <th>email</th>
              <th>date</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {session.map((d, i) => (
              <>
                <tr key={i + 'r'} className="list-group-item">
                  <td>{d.userId}</td>
                  <td>{d.sessionToken}</td>
                  <td>{user.filter((e) => e.id === d.userId)[0]?.email}</td>
                  <td>{d.createdAt}</td>
                  <td>
                    <button
                      onClick={() =>
                        router.push(`/auth/db?session=${d.sessionToken}`)
                      }
                    >
                      Sign Out
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <h1>Active Users</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>date</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((d, i) => (
              <>
                <tr key={i + 'p'} className="list-group-item">
                  <td>{d.id}</td>
                  <td>{d.email}</td>
                  <td>{d.createdAt}</td>
                  <td>
                    <button
                      onClick={() => router.push(`/auth/db?user=${d.id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <h1>Add User</h1>
        <div className={'login'}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            id="url"
            name="url"
            required
            placeholder={'URL'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              router.push(`/auth/db?email=${email}&url=${url}`);
              setEmail('');
              setUrl('');
              setText('done');
            }}
          >
            Submit
          </button>
          {text && <p>Email has been sent successfully.</p>}
        </div>
      </div>
    </>
  );
}
