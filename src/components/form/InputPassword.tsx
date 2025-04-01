import InputText from "./InputText";
import { TextInputProps } from "./types";

const InputPassword = (props: Omit<TextInputProps, "type">) => {
  return <InputText {...props} type="password" />;
};

export default InputPassword;
