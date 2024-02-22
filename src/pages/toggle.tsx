import type { NextPage } from "next";
import Head from "next/head";
import { ToggleFreezeView } from "../views";

const ToggleFreeze: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Toggle Freeze</title>
        <meta
          name="description"
          content="Toggle Freeze"
        />
      </Head>
      <ToggleFreezeView />
    </div>
  );
};

export default ToggleFreeze;
