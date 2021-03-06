import React from "react";
import { useRouter } from "next/router";

import App from "../../src/components/chat/App.js";
import Layout from "../../src/components/Layout";

export default function ChatRoom() {
  const router = useRouter();
  const { roomName } = router.query;

  return (
    <React.Fragment>
      <Layout noFooter subtitle="Support Room">
        <App roomName={roomName} />
      </Layout>
    </React.Fragment>
  );
}
