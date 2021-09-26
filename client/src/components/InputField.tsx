import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

const InputField: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textArea?: boolean;
  }
> = ({ label, textArea, size: _, ...props }) => {
  let InputOrTextArea: any = Input;
  if (textArea) {
    InputOrTextArea = Textarea;
  }

  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!(error && touched)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
