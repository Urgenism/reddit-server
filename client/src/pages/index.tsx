import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";

const Index: React.FC<{}> = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <Box>you got query failed for some reason</Box>;
  }

  return (
    <Layout>
      <Flex textAlign='center'>
        <Heading>LiReddit</Heading>
        <NextLink href='create-post'>
          <Link ml='auto'>Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading..</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex p={5} shadow='md' borderWidth='1px' key={p.id}>
              <Flex
                direction='column'
                justifyContent='center'
                alignItems='center'
                mr='4'
              >
                <IconButton
                  aria-label='updoot posts'
                  size='sm'
                  onClick={() => console.log("clicked")}
                >
                  <ChevronUpIcon />
                </IconButton>
                {p.points}
                <IconButton
                  aria-label='downboot posts'
                  size='sm'
                  onClick={() => console.log("clicked")}
                >
                  <ChevronDownIcon />
                </IconButton>
              </Flex>
              <Box>
                <Heading fontSize='xl'>{p.title}</Heading>
                <Text>Posted By {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data?.posts.hasMore ? (
        <Flex justifyContent='center' mt='3'>
          <Button
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
