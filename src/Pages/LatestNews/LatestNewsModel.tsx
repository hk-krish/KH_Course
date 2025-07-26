import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { ToolbarOptions } from "../../Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleLatestNewsApiData, setLatestNewsModal, setSingleEditingIdLatestNews } from "../../ReduxToolkit/Slice/LatestNewsSlice";
import { LatestNewsFormData } from "../../Types/LatestNews";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { LatestNewsSchema } from "../../Utils/ValidationSchemas";

const LatestNewsModel: FC<ModalPassPropsType> = ({ getApi, isEdit, setEdit }) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [thumbnailImageList, setThumbnailImageList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isLatestNewsModal, singleEditingIdLatestNews, singleLatestNewsData } = useAppSelector((state) => state.latestNews);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LatestNewsSchema),
    defaultValues: { title: "", subtitle: "", priority: 0, description: "", image: [], thumbnail: [] },
  });

  useEffect(() => {
    if (singleLatestNewsData && isEdit) {
      setValue("title", singleLatestNewsData?.title);
      setValue("subtitle", singleLatestNewsData?.subtitle);
      setValue("priority", singleLatestNewsData?.priority);
      setValue("description", singleLatestNewsData?.description);
      if (singleLatestNewsData?.image) {
        setValue("image", [singleLatestNewsData?.image]);
        setImageList([singleLatestNewsData?.image]);
        trigger("image");
      }
      if (singleLatestNewsData?.thumbnail) {
        setValue("thumbnail", [singleLatestNewsData?.thumbnail]);
        setThumbnailImageList([singleLatestNewsData?.thumbnail]);
        trigger("thumbnail");
      }
    }
  }, [isEdit, setValue, singleLatestNewsData, trigger]);

  const onCloseModal = () => {
    dispatch(setLatestNewsModal());
    dispatch(setSingleEditingIdLatestNews(null));
    setImageList([]);
    setThumbnailImageList([]);
    setEdit(false);
    reset();
  };

  const onSubmit = async (data: LatestNewsFormData) => {
    const LatestNews: any = {};
    if (data.title) LatestNews.title = data.title;
    if (data.subtitle) LatestNews.subtitle = data.subtitle;
    if (data.priority) LatestNews.priority = data.priority;
    if (data.description) LatestNews.description = data.description;
    if (imageList[0]) LatestNews.image = imageList[0];
    if (thumbnailImageList[0]) LatestNews.thumbnail = thumbnailImageList[0];
    try {
      const response = isEdit ? await Post(Url_Keys.LatestNews.Edit, { id: singleLatestNewsData._id, ...LatestNews }) : await Post(Url_Keys.LatestNews.Add, LatestNews);
      if (response?.status === 200) {
        onCloseModal();
        getApi();
      }
    } catch (error) {}
  };

  const getSingleLatestNews = useCallback(async () => {
    try {
      await dispatch(fetchSingleLatestNewsApiData({ id: singleEditingIdLatestNews }));
    } catch (error) {}
  }, [dispatch, singleEditingIdLatestNews]);

  useEffect(() => {
    if (singleEditingIdLatestNews) getSingleLatestNews();
  }, [getSingleLatestNews, singleEditingIdLatestNews]);

  return (
    <Modal size="xl" centered isOpen={isLatestNewsModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit" : "Add"} LatestNews
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="LatestNewsForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="6" className="input-box">
              <Label>
                LatestNews Title <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter LatestNews Title" {...register("title")} />
              {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>
                LatestNews Subtitle <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter LatestNews Subtitle" {...register("subtitle")} />
              {errors.subtitle && <p className="text-danger mt-1">{errors.subtitle.message}</p>}
            </Col>
            <Col md="12" className="input-box">
              <Label htmlFor="priority">
                Priority <span className="required">*</span>
              </Label>
              <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
              {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
            </Col>
            <Col md="12" className="input-box">
              <Label htmlFor="priority">
                description <span className="required">*</span>
              </Label>
              <Controller name="description" control={control} render={({ field }) => <ReactQuill {...field} className="description-quill" theme="snow" modules={{ toolbar: ToolbarOptions }} onChange={(content) => field.onChange(content)} />} />
              {errors.description && <span className="text-danger">{errors.description.message}</span>}
            </Col>
            <Col md="2" className="input-box">
              <Label>
                Upload Images <span className="required">*</span>
              </Label>
              <ImageUpload name="image" trigger={trigger} fileList={imageList} setFileList={setImageList} setValue={setValue} />
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>
            <Col md="3" className="input-box">
              <Label>
                Upload thumbnail Images <span className="required">*</span>
              </Label>
              <ImageUpload name="thumbnail" trigger={trigger} fileList={thumbnailImageList} setFileList={setThumbnailImageList} setValue={setValue} />
              {errors.thumbnail && <p className="text-danger mt-1">{errors.thumbnail.message}</p>}
            </Col>
          </Form>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="right-part">
          <Button type="submit" form="LatestNewsForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default LatestNewsModel;
