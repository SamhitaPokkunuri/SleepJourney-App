import Head from 'next/head';

export default function Meta({ isHomePage }) {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="description"
        content={`Vodafone is a leader in technology communications through mobile, fixed, broadband and TV. Learn more about Vodafone Group.`}
      />
      {isHomePage && (
        <meta
          name="google-site-verification"
          content="3M0ULqtyT5RjjIr9P3588yVppMjrfY1LTLbq7NSnCCg"
        />
      )}
    </Head>
  );
}
