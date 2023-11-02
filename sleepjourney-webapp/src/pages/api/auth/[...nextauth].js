import AWS from 'aws-sdk';
import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';
import nodemailer from 'nodemailer';

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        if (email === process.env.NEXTAUTH_ADMIN) {
          transport.sendMail({
            to: email,
            from,
            subject: `Sign in to ${host}`,
            text: '',
            html: `<p>Here is your link <a href="${url}&callbackUrl=${process.env.NEXTAUTH_URL}/brand/living-speechmark-generator">Sign in</a>. Thanks</p>`,
          });
        } else {
          transport.sendMail({
            to: email,
            from,
            subject: `Sign in to ${host}`,
            text: '',
            html: '<p>Your email has been sent to Admin for approval. Thanks</p>',
          });
          transport.sendMail({
            to: process.env.NEXTAUTH_ADMIN,
            from,
            subject: `Sign in to ${host}`,
            text: '',
            html: `<p>This email ${email} has been requested for approval. Here is Login URL ${url}.  Thanks</p>`,
          });
        }
      },
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(new AWS.DynamoDB.DocumentClient()),
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: false,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 365 * 30 * 24 * 60 * 60, // 365 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ email }) {
      const address = email.split('@').pop();
      if (address !== 'wearedauntless.com') {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbackUrl: `${process.env.NEXTAUTH_URL}/brand/living-speechmark-generator`,
});
