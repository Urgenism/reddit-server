import { withUrqlClient } from "next-urql";
import React from "react";

import Navbar from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";

const Index: React.FC<{}> = () => {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      <Navbar />
      <div>Hello World</div>
      <br />
      {!data ? (
        <div>loading..</div>
      ) : (
        data.posts.map((p) => <div key={p._id}>{p.title}</div>)
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
