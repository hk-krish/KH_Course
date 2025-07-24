import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleCourseApiData, setCourseModal, setSingleEditingIdCourse } from "../../ReduxToolkit/Slice/CourseSlice";
import { CourseSchema } from "../../Utils/ValidationSchemas";
import { CourseFormData } from "../../Types/Course";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { fetchCategoryApiData } from "../../ReduxToolkit/Slice/CategorySlice";
import { Select } from "antd";
import CustomTypeahead from "../../CoreComponents/CustomTypeahead";
import { generateOptions, normalizeTags } from "../../Utils";

const CourseModel: FC<ModalPassPropsType> = ({ getApi }) => {
  const [fileList, setFileList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isCourseModal, singleEditingIdCourse, singleCourseData } = useAppSelector((state) => state.course);
  const { allCategory } = useAppSelector((state) => state.category);
  console.log("allCategory", allCategory);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourseSchema),
  });

  useEffect(() => {
    if (singleCourseData) {
      setValue("name", singleCourseData?.name);
      setValue("action", singleCourseData?.action);
      setValue("feature", singleCourseData?.feature);
      const selectedOptions = allCategory?.category_data?.filter((product) => singleCourseData.categoryType?.includes(product._id))?.map((product) => ({ label: product.name, value: product._id }));
      setValue("categoryType", selectedOptions || []);
      // setValue("categoryType", singleCourseData?.categoryType);
      if (singleCourseData?.image) {
        setValue("image", [singleCourseData?.image]);
        setFileList([singleCourseData?.image]);
        trigger("image");
      }
    }
  }, [allCategory?.category_data, setValue, singleCourseData, trigger]);

  const onCloseModal = () => {
    dispatch(setCourseModal());
    dispatch(setSingleEditingIdCourse(null));
    reset();
    setFileList([]);
  };

  const onSubmit = async (data: CourseFormData) => {

    const Course: any = {};
    if (data.name) Course.name = data.name;
    if (data.feature) Course.feature = data.feature;
    if (data.action) Course.action = data.action;
    if (data.categoryType) Course.categoryType = normalizeTags(data.categoryType);
    if (fileList[0]) Course.image = fileList[0];
    try {
      const response = singleEditingIdCourse ? await Post(Url_Keys.Course.Edit, { id: singleCourseData._id, ...Course }) : await Post(Url_Keys.Course.Add, Course);
      if (response?.status === 200) {
        onCloseModal();
        // trigger("image");
        getApi();
      }
    } catch (error) {}
  };

  const getSingleCourse = useCallback(async () => {
    try {
      await dispatch(fetchSingleCourseApiData({ id: singleEditingIdCourse }));
    } catch (error) {}
  }, [dispatch, singleEditingIdCourse]);

  useEffect(() => {
    if (singleEditingIdCourse) getSingleCourse();
  }, [getSingleCourse, singleEditingIdCourse]);

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  return (
    <Modal size="md" centered isOpen={isCourseModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Course
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="CourseForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>Course Name</Label>
              <input type="text" placeholder="Enter Course Name" {...register("name")} />
              {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
            </Col>

            <Col md="12">
              <div className="input-box">
                <CustomTypeahead control={control} errors={errors.categoryType} title="Category" name="categoryType" options={generateOptions(allCategory?.category_data)} />
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
          <Button type="submit" form="CourseForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default CourseModel;
