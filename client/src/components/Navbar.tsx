import { Box, Link, Flex, Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Navbar: React.FC<{}> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  // data is loading
  if (fetching) {
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href='/login'>
          <Link mr='2'>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr='3'>{data.me.username}</Box>
        <Button
          variant='link'
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg='tomato' p='4' ml='auto' justifyContent='flex-end' color='white'>
      {body}
    </Flex>
  );
};

export default Navbar;
