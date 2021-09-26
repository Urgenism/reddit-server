import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IconButton, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface IUpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<IUpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr='4'>
      <IconButton
        aria-label='updoot posts'
        size='sm'
        isLoading={loadingState === "updoot-loading"}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        onClick={() => {
          if (post.voteStatus === 1) return;
          setLoadingState("updoot-loading");
          vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
      >
        <ChevronUpIcon />
      </IconButton>
      {post.points}
      <IconButton
        aria-label='downboot posts'
        size='sm'
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        onClick={() => {
          if (post.voteStatus === -1) return;
          setLoadingState("downdoot-loading");
          vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
      >
        <ChevronDownIcon />
      </IconButton>
    </Flex>
  );
};

export default UpdootSection;
