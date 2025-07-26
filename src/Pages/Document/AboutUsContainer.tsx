import { FormEvent, useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import Information from "../../CoreComponents/Information";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchAboutUsApiData } from "../../ReduxToolkit/Slice/DocumentSlice";

const AboutUsContainer = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { allAboutUs } = useAppSelector((state) => state.document);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Post(Url_Keys.AboutUs.AboutUsEdit, { aboutUs: editorContent });
      if (response?.status === 200) {
        setIsEditing(false);
      }
      setIsEditing(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (allAboutUs) {
      setEditorContent(allAboutUs?.aboutUs);
    }
  }, [allAboutUs]);

  useEffect(() => {
    dispatch(fetchAboutUsApiData());
  }, [dispatch]);
  return (
      <Container fluid>
        <Col xl="12">
          <Information headerTitle="About Us" editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
        </Col>
      </Container>
  );
};

export default AboutUsContainer;
