import InputText from "./InputText";
import { TextInputProps } from "./types";

const InputEmail = (props: Omit<TextInputProps, "type">) => {
  return <InputText {...props} type="email" />;
};

export default InputEmail;
