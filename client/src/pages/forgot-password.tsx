import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";
import { toErrorMap } from "../utils/toErrorMap";
import register from "./register";

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      {complete ? (
        <Box>If an account with email exists, we sent you an email.</Box>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb='4'>
                <InputField name='email' placeholder='Email' label='Email' />
              </Box>
              <Button type='submit' colorScheme='teal' isLoading={isSubmitting}>
                Forgot password
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
