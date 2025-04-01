import InputText from "./InputText";
import { TextInputProps } from "./types";

const InputNumber = (props: Omit<TextInputProps, "type">) => {
  return <InputText {...props} type="number" />;
};

export default InputNumber;
