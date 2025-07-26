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
import { fetchSingleBlogApiData, setBlogModal, setSingleEditingIdBlog } from "../../ReduxToolkit/Slice/BlogSlice";
import { BlogFormData } from "../../Types/Blog";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { BlogSchema } from "../../Utils/ValidationSchemas";

const BlogModel: FC<ModalPassPropsType> = ({ getApi, isEdit, setEdit }) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [thumbnailImageList, setThumbnailImageList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isBlogModal, singleEditingIdBlog, singleBlogData } = useAppSelector((state) => state.blog);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BlogSchema),
    defaultValues: { title: "", subtitle: "", priority: 0, description: "", image: [], thumbnail: [] },
  });

  useEffect(() => {
    if (singleBlogData && isEdit) {
      setValue("title", singleBlogData?.title);
      setValue("subtitle", singleBlogData?.subtitle);
      setValue("priority", singleBlogData?.priority);
      setValue("description", singleBlogData?.description);
      if (singleBlogData?.image) {
        setValue("image", [singleBlogData?.image]);
        setImageList([singleBlogData?.image]);
        trigger("image");
      }
      if (singleBlogData?.thumbnail) {
        setValue("thumbnail", [singleBlogData?.thumbnail]);
        setThumbnailImageList([singleBlogData?.thumbnail]);
        trigger("thumbnail");
      }
    }
  }, [isEdit, setValue, singleBlogData, trigger]);

  const onCloseModal = () => {
    dispatch(setBlogModal());
    dispatch(setSingleEditingIdBlog(null));
    setImageList([]);
    setThumbnailImageList([]);
    setEdit(false);
    reset();
  };

  const onSubmit = async (data: BlogFormData) => {
    const Blog: any = {};
    if (data.title) Blog.title = data.title;
    if (data.subtitle) Blog.subtitle = data.subtitle;
    if (data.priority) Blog.priority = data.priority;
    if (data.description) Blog.description = data.description;
    if (imageList[0]) Blog.image = imageList[0];
    if (thumbnailImageList[0]) Blog.thumbnail = thumbnailImageList[0];
    try {
      const response = isEdit ? await Post(Url_Keys.Blog.Edit, { id: singleBlogData._id, ...Blog }) : await Post(Url_Keys.Blog.Add, Blog);
      if (response?.status === 200) {
        onCloseModal();
        getApi();
      }
    } catch (error) {}
  };

  const getSingleBlog = useCallback(async () => {
    try {
      await dispatch(fetchSingleBlogApiData({ id: singleEditingIdBlog }));
    } catch (error) {}
  }, [dispatch, singleEditingIdBlog]);

  useEffect(() => {
    if (singleEditingIdBlog) getSingleBlog();
  }, [getSingleBlog, singleEditingIdBlog]);

  return (
    <Modal size="xl" centered isOpen={isBlogModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit" : "Add"} Blog
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="BlogForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="6" className="input-box">
              <Label>
                Blog Title <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Blog Title" {...register("title")} />
              {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>
                Blog Subtitle <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Blog Subtitle" {...register("subtitle")} />
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
          <Button type="submit" form="BlogForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default BlogModel;
