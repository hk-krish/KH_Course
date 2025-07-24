import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleStudentsApiData, setStudentsModal, setSingleEditingIdStudents } from "../../ReduxToolkit/Slice/StudentsSlice";
import { StudentsSchema } from "../../Utils/ValidationSchemas";
import { StudentsFormData } from "../../Types/Students";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { fetchCategoryApiData } from "../../ReduxToolkit/Slice/CategorySlice";

const StudentsModel: FC<ModalPassPropsType> = ({ getApi }) => {
  const [fileList, setFileList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isStudentsModal, singleEditingIdStudents, singleStudentsData } = useAppSelector((state) => state.students);
  const { allCategory } = useAppSelector((state) => state.category);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StudentsSchema),
  });

  useEffect(() => {
    if (singleStudentsData) {
      setValue("name", singleStudentsData?.name);
      setValue("action", singleStudentsData?.action);
      setValue("feature", singleStudentsData?.feature);
      setValue("categoryType", singleStudentsData?.categoryType);
      if (singleStudentsData?.image) {
        setValue("image", [singleStudentsData?.image]);
        setFileList([singleStudentsData?.image]);
        trigger("image");
      }
    }
  }, [setValue, singleStudentsData, trigger]);

  const onCloseModal = () => {
    dispatch(setStudentsModal());
    dispatch(setSingleEditingIdStudents(null));
    reset();
    setFileList([]);
  };

  const onSubmit = async (data: StudentsFormData) => {
    const Students: any = {};
    if (data.name) Students.name = data.name;
    if (data.feature) Students.feature = data.feature;
    if (data.action) Students.action = data.action;
    if (data.categoryType) Students.categoryType = data.categoryType;
    if (fileList[0]) Students.image = fileList[0];
    try {
      const response = singleEditingIdStudents ? await Post(Url_Keys.Students.Edit, { id: singleStudentsData._id, ...Students }) : await Post(Url_Keys.Students.Add, Students);
      if (response?.status === 200) {
        onCloseModal();
        // trigger("image");
        getApi();
      }
    } catch (error) {}
  };

  const getSingleStudents = useCallback(async () => {
    try {
      await dispatch(fetchSingleStudentsApiData({ id: singleEditingIdStudents }));
    } catch (error) {}
  }, [dispatch, singleEditingIdStudents]);

  useEffect(() => {
    if (singleEditingIdStudents) getSingleStudents();
  }, [getSingleStudents, singleEditingIdStudents]);

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  return (
    <Modal size="md" centered isOpen={isStudentsModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Students
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="StudentsForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>Students Name</Label>
              <input type="text" placeholder="Enter Students Name" {...register("name")} />
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
          <Button type="submit" form="StudentsForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default StudentsModel;
