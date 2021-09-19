import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

const InputField: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
  }
> = ({ label, size: _, ...props }) => {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!(error && touched)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
