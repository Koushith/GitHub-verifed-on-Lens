import ReactQuill from "react-quill";
import { StyledDiv } from "./rich-text.styles";
import "react-quill/dist/quill.snow.css";
interface RichTextEditorComponentProps {
  label?: string;
  onChange?: any;
  value?: string;
  name?: string;
}

export const RichTextEditor = (props: RichTextEditorComponentProps) => {
  const { label, value, onChange } = props;

  return (
    <StyledDiv>
      <label htmlFor={label}>{label}</label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="input"
      />
    </StyledDiv>
  );
};
