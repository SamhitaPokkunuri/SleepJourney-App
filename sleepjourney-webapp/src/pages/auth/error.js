export async function getServerSideProps(context) {
  const query = context.query;

  return {
    props: {query: query.error},
  };
}
export default function Error({query}) {
  return (
    <>
      <style global jsx>
        {`
          body {
            background-color: rgb(230, 0, 0) !important;
            color: white;
          }
          .text {
            color: black;
            overflow: hidden;
            padding: 40px 30px 30px 30px;
            border-radius: 10px;
            position: relative;
            margin: 0 auto;
            width: 100%;
          }
          .text > h1 {
            text-align: center;
            color:white;
          }
        `}
      </style>
      <div className={'text'}>
        <h1>
          {query} Error! Pleas contact admin!
        </h1>
      </div>
    </>
  );
}
