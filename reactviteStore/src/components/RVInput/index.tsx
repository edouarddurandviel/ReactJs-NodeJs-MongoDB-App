import { useField } from "@formiz/core";
import type { SimpleInputProps } from "./types";
import { FieldSet, InputField, Label } from "./styles";

type Value = string | number | readonly string[] | undefined;

const Input = (props: SimpleInputProps) => {
  const { value, isValid, errorMessage, setValue, isSubmitted } = useField(props);
  const { label, id, placeholder, type, autoFocus = false } = props;

  const showError = !isValid && isSubmitted;

  return (
    <FieldSet>
      <Label>{label}</Label>
      <InputField 
        value={(value as Value) ?? ""} 
        id={id} 
        type={type} 
        onChange={(e) => {
          setValue(e.target.value)
        }} 
        placeholder={placeholder} 
        autoFocus={autoFocus} 
      />
      {showError && errorMessage}
    </FieldSet>
  );
};

export default Input;
