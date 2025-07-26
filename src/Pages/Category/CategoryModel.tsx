import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleCategoryApiData, setCategoryModal, setSingleEditingIdCategory } from "../../ReduxToolkit/Slice/CategorySlice";
import { CategorySchema } from "../../Utils/ValidationSchemas";
import { CategoryFormData } from "../../Types/Category";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { ModalPassPropsType } from "../../Types/CoreComponents";

const CategoryModel: FC<ModalPassPropsType> = ({ getApi, isEdit, setEdit }) => {
  const { isCategoryModal, singleEditingIdCategory, singleCategoryData } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  useEffect(() => {
    if (singleCategoryData && isEdit) {
      setValue("name", singleCategoryData?.name);
      setValue("action", singleCategoryData?.action);
      setValue("feature", singleCategoryData?.feature);
      setValue("priority", singleCategoryData?.priority);
      if (singleCategoryData?.image) {
        setValue("image", [singleCategoryData?.image]);
        setFileList([singleCategoryData?.image]);
        trigger("image");
      }
    }
  }, [isEdit, setValue, singleCategoryData, trigger]);

  const onCloseModal = () => {
    dispatch(setCategoryModal());
    dispatch(setSingleEditingIdCategory(null));
    reset();
    setFileList([]);
    setEdit(false);
  };

  const onSubmit = async (data: CategoryFormData) => {
    const Category: any = {};
    if (data.name) Category.name = data.name;
    if (data.feature) Category.feature = data.feature;
    if (data.action) Category.action = data.action;
    if (data.priority) Category.priority = data.priority;
    if (fileList[0]) Category.image = fileList[0];
    try {
      const response = isEdit ? await Post(Url_Keys.Category.Edit, { id: singleCategoryData._id, ...Category }) : await Post(Url_Keys.Category.Add, Category);
      if (response?.status === 200) {
        onCloseModal();
        // trigger("image");
        getApi();
      }
    } catch (error) {}
  };

  const getSingleCategory = useCallback(async () => {
    try {
      await dispatch(fetchSingleCategoryApiData({ id: singleEditingIdCategory }));
    } catch (error) {}
  }, [dispatch, singleEditingIdCategory]);

  useEffect(() => {
    if (singleEditingIdCategory) getSingleCategory();
  }, [getSingleCategory, singleEditingIdCategory]);

  return (
    <Modal size="md" centered isOpen={isCategoryModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit" : "Add"} Category
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="categoryForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>
                Category Name <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Category Name" {...register("name")} />
              {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
            </Col>
            <Col md="12" className="input-box">
              <Label htmlFor="priority">
                Priority <span className="required">*</span>
              </Label>
              <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
              {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
            </Col>

            <Col md="12" className="input-box">
              <Label>
                Upload Images <span className="required">*</span>
              </Label>
              <ImageUpload name="image" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>

            <Col md="12" className="input-box">
              <CustomCheckbox register={register} title="Feature" name="feature" />
            </Col>
            <Col md="12" className="input-box">
              <CustomCheckbox register={register} title="Action" name="action" />
            </Col>
          </Form>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="right-part">
          <Button type="submit" form="categoryForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default CategoryModel;
