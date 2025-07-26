import { FormEvent, useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import Information from "../../CoreComponents/Information";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchTermsConditionApiData } from "../../ReduxToolkit/Slice/DocumentSlice";

const TermsConditionsContainer = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { allTermsCondition } = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Post(Url_Keys.TermsCondition.TermsConditionEdit, { termsCondition: editorContent });
      if (response?.status === 200) {
        setIsEditing(false);
      }
      setIsEditing(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (allTermsCondition) {
      setEditorContent(allTermsCondition?.termsCondition);
    }
  }, [allTermsCondition]);

  useEffect(() => {
    dispatch(fetchTermsConditionApiData());
  }, [dispatch]);
  return (
    <Container fluid>
      <Col xl="12">
        <Information headerTitle="Terms & Conditions" editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
      </Col>
    </Container>
  );
};

export default TermsConditionsContainer;
