import AWS from 'aws-sdk';
import { getSession } from 'next-auth/client';
import nodemailer from 'nodemailer';

export async function getServerSideProps(context) {
  const query = context.query;
  const session = await getSession(context);

  if (!session && session?.user.email !== process.env.NEXTAUTH_ADMIN) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  AWS.config.update({
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    region: process.env.NEXT_AUTH_AWS_REGION,
  });
  const client = new AWS.DynamoDB.DocumentClient();
  const TableName = process.env.NEXTAUTH_TABLE;

  const deleteSession = async (sessionToken) => {
    let _a;
    const data = await client
      .query({
        TableName,
        IndexName: 'GSI1',
        KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
        ExpressionAttributeNames: {
          '#gsi1pk': 'GSI1PK',
          '#gsi1sk': 'GSI1SK',
        },
        ExpressionAttributeValues: {
          ':gsi1pk': `SESSION#${sessionToken}`,
          ':gsi1sk': `SESSION#${sessionToken}`,
        },
      })
      .promise();
    if (
      ((_a = data === null || data === void 0 ? void 0 : data.Items) === null ||
      _a === void 0
        ? void 0
        : _a.length) <= 0
    )
      return null;
    const infoToDelete = data.Items[0];
    const deleted = await client
      .delete({
        TableName,
        Key: {
          pk: infoToDelete.pk,
          sk: infoToDelete.sk,
        },
      })
      .promise();
    return deleted;
  };
  const deleteUser = async (userId) => {
    const deleted = await client
      .delete({
        TableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `USER#${userId}`,
        },
      })
      .promise();
    return deleted;
  };
  if (query.user) {
    await deleteUser(query.user);
  }
  if (query.session) {
    await deleteSession(query.session);
  }
  if (query.email) {
    const transport = nodemailer.createTransport(process.env.EMAIL_SERVER);
    transport.sendMail({
      to: query.email,
      from: process.env.EMAIL_FROM,
      subject: `Sign in to ${process.env.NEXTAUTH_URL}`,
      text: '',
      html: `<p>Here is your link <a href="${query.url}&callbackUrl=${process.env.NEXTAUTH_URL}/brand/living-speechmark-generator">Sign in</a>. Thanks</p>`,
    });
  }

  return {
    redirect: {
      destination: '/auth/admin',
      permanent: false,
    },
  };
}

export default function db() {
  return <></>;
}
