import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface IRegisterProps {}

const Register: React.FC<IRegisterProps> = () => {
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb='4'>
              <InputField
                name='username'
                placeholder='username'
                label='Username'
              />
            </Box>
            <Box mb='4'>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>
            <Button type='submit' colorScheme='teal' isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
