import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleLectureApiData, setLectureModal, setSingleEditingIdLecture } from "../../ReduxToolkit/Slice/LectureSlice";
import { LectureSchema } from "../../Utils/ValidationSchemas";
import { LectureFormData } from "../../Types/Lecture";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { fetchCategoryApiData } from "../../ReduxToolkit/Slice/CategorySlice";

const LectureModel: FC<ModalPassPropsType> = ({ getApi }) => {
  const [fileList, setFileList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isLectureModal, singleEditingIdLecture, singleLectureData } = useAppSelector((state) => state.lecture);
  const { allCategory } = useAppSelector((state) => state.category);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LectureSchema),
  });

  useEffect(() => {
    if (singleLectureData) {
      setValue("name", singleLectureData?.name);
      setValue("action", singleLectureData?.action);
      setValue("feature", singleLectureData?.feature);
      setValue("categoryType", singleLectureData?.categoryType);
      if (singleLectureData?.image) {
        setValue("image", [singleLectureData?.image]);
        setFileList([singleLectureData?.image]);
        trigger("image");
      }
    }
  }, [setValue, singleLectureData, trigger]);

  const onCloseModal = () => {
    dispatch(setLectureModal());
    dispatch(setSingleEditingIdLecture(null));
    reset();
    setFileList([]);
  };

  const onSubmit = async (data: LectureFormData) => {
    const Lecture: any = {};
    if (data.name) Lecture.name = data.name;
    if (data.feature) Lecture.feature = data.feature;
    if (data.action) Lecture.action = data.action;
    if (data.categoryType) Lecture.categoryType = data.categoryType;
    if (fileList[0]) Lecture.image = fileList[0];
    try {
      const response = singleEditingIdLecture ? await Post(Url_Keys.Lecture.Edit, { id: singleLectureData._id, ...Lecture }) : await Post(Url_Keys.Lecture.Add, Lecture);
      if (response?.status === 200) {
        onCloseModal();
        // trigger("image");
        getApi();
      }
    } catch (error) {}
  };

  const getSingleLecture = useCallback(async () => {
    try {
      await dispatch(fetchSingleLectureApiData({ id: singleEditingIdLecture }));
    } catch (error) {}
  }, [dispatch, singleEditingIdLecture]);

  useEffect(() => {
    if (singleEditingIdLecture) getSingleLecture();
  }, [getSingleLecture, singleEditingIdLecture]);

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  return (
    <Modal size="md" centered isOpen={isLectureModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Lecture
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="LectureForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>Lecture Name</Label>
              <input type="text" placeholder="Enter Lecture Name" {...register("name")} />
              {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
            </Col>
            <Col md="12">
              <div className="input-box">
                <Label>Category</Label>
                <select className="form-select" {...register("categoryType")}>
                  <option value="">-- Select Category --</option>
                  {allCategory?.category_data?.map((category, index) => (
                    <option value={category?._id} key={index}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                {errors.categoryType && <p className="text-danger">{errors.categoryType.message}</p>}
              </div>
            </Col>

            <Col md="12" className="input-box">
              <Label>
                Upload Images <span className="required">*</span>
              </Label>
              <ImageUpload name="image" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>
            <Col md="3" className="input-box">
              <CustomCheckbox register={register} title="Feature" name="feature" />
            </Col>
            <Col md="3" className="input-box">
              <CustomCheckbox register={register} title="Action" name="action" />
            </Col>
          </Form>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="right-part">
          <Button type="submit" form="LectureForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default LectureModel;
