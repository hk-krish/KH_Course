import { FormEvent, useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import Information from "../../CoreComponents/Information";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchPrivacyPoliciesApiData } from "../../ReduxToolkit/Slice/DocumentSlice";

const PrivacyPoliciesContainer = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { allPrivacyPolicy } = useAppSelector((state) => state.document);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Post(Url_Keys.PrivacyPolicy.PrivacyPolicyEdit, { privacyPolicy: editorContent });
      if (response?.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchPrivacyPoliciesApiData());
  }, [dispatch]);

  useEffect(() => {
    if (allPrivacyPolicy) {
      setEditorContent(allPrivacyPolicy?.privacyPolicy);
    }
  }, [allPrivacyPolicy]);

  return (
    <Container fluid>
      <Col xl="12">
        <Information headerTitle="Privacy Policy" editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
      </Col>
    </Container>
  );
};

export default PrivacyPoliciesContainer;
