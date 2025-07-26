import { FC, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { Button, Card, CardBody, Form } from "reactstrap";
import CommonCardHeader from "./CommonCardHeader";
import { InformationProp } from "../Types/CoreComponents";
import { ToolbarOptions } from "../Data/CoreComponents";

const Information: FC<InformationProp> = ({ headerTitle, editorContent, setEditorContent, handleSubmit, isEditing, setIsEditing }) => {
  const [value, setValue] = useState(editorContent);

  const quillRef = useRef<ReactQuill>(null);

  const onEditorChange = (content: string) => {
    setValue(content);
    setEditorContent(content);
  };

  useEffect(() => {
    if (editorContent && editorContent !== value) {
      setValue(editorContent);
    }
  }, [editorContent, value]);
  return (
    <Card>
      {headerTitle && <CommonCardHeader title={headerTitle} setIsEditing={setIsEditing} isEditing={isEditing} />}
      <CardBody>
        <ReactQuill className="Information" ref={quillRef} theme="snow" value={value} onChange={onEditorChange} modules={{ toolbar: ToolbarOptions }} readOnly={!isEditing} />
        {isEditing && (
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mt-3 mb-0">
              <Button color="primary">Save</Button>
            </div>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Information;
