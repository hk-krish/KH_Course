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
import CustomTypeahead from "../../CoreComponents/CustomTypeahead";
import { fetchStudentsApiData } from "../../ReduxToolkit/Slice/StudentsSlice";
import { generateOptions, normalizeTags } from "../../Utils";

const LectureModel: FC<ModalPassPropsType> = ({ getApi, isEdit, setEdit }) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isLectureModal, singleEditingIdLecture, singleLectureData, singleCourseId } = useAppSelector((state) => state.lecture);
  const { allStudents } = useAppSelector((state) => state.students);
  console.log("singleEditingIdLecture", singleEditingIdLecture);
  console.log("singleLectureData", singleLectureData);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LectureSchema),
  });

  useEffect(() => {
    if (singleLectureData && isEdit) {
      setValue("title", singleLectureData?.title);
      setValue("youtubeLink", singleLectureData?.youtubeLink);
      setValue("priority", singleLectureData?.priority);
      const userIdsOptions = allStudents?.user_data?.filter((user) => singleLectureData.userIds?.includes(user._id))?.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user._id }));
      setValue("userIds", userIdsOptions || []);
      if (singleLectureData?.thumbnail) {
        setValue("image", [singleLectureData?.thumbnail]);
        setImageList([singleLectureData?.thumbnail]);
        trigger("image");
      }
      if (singleLectureData?.PDF) {
        setValue("pdf", [singleLectureData?.PDF]);
        setFileList([singleLectureData?.PDF]);
        trigger("pdf");
      }
    }
  }, [allStudents?.user_data, isEdit, setValue, singleLectureData, trigger]);

  const onCloseModal = () => {
    dispatch(setLectureModal());
    dispatch(setSingleEditingIdLecture(null));
    reset();
    setFileList([]);
    setImageList([]);
    setEdit(false);
    setValue("userIds", []);
  };

  const onSubmit = async (data: LectureFormData) => {
    const Lecture: any = {};
    if (data.title) Lecture.title = data.title;
    if (data.youtubeLink) Lecture.youtubeLink = data.youtubeLink;
    if (data.priority) Lecture.priority = data.priority;
    if (data.userIds) Lecture.userIds = normalizeTags(data.userIds);
    if (singleCourseId) Lecture.courseId = singleCourseId;
    if (imageList[0]) Lecture.thumbnail = imageList[0];
    if (fileList[0]) Lecture.PDF = fileList[0];
    try {
      const response = isEdit ? await Post(Url_Keys.Lecture.Edit, { id: singleLectureData._id, ...Lecture }) : await Post(Url_Keys.Lecture.Add, Lecture);
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

  const getAllStudents = useCallback(async () => {
    try {
      await dispatch(fetchStudentsApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const extendedOptions = [{ value: "all", label: "Select All" }, ...generateOptions(allStudents?.user_data)];

  return (
    <Modal size="md" centered isOpen={isLectureModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit" : "Add"} Lecture
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="LectureForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>
                Lecture Title <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Lecture Name" {...register("title")} />
              {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
            </Col>
            <Col md="12" className="input-box">
              <Label>
                Youtube Link <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Youtube Link" {...register("youtubeLink")} />
              {errors.youtubeLink && <p className="text-danger mt-1">{errors.youtubeLink.message}</p>}
            </Col>
            <Col md="12">
              <div className="input-box">
                <CustomTypeahead
                  required
                  control={control}
                  errors={errors.userIds}
                  title="Students"
                  name="userIds"
                  options={extendedOptions}
                  onChangeOverride={(selected, fieldOnChange) => {
                    if (selected.some((item) => item.value === "all")) {
                      fieldOnChange(generateOptions(allStudents?.user_data));
                    } else {
                      fieldOnChange(selected);
                    }
                  }}
                />
              </div>
            </Col>
            <Col md="12" className="input-box">
              <Label htmlFor="priority">
                Priority <span className="required">*</span>
              </Label>
              <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
              {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
            </Col>

            <Col md="6" className="input-box">
              <Label>
                Upload Thumbnail Image <span className="required">*</span>
              </Label>
              <ImageUpload name="image" trigger={trigger} fileList={imageList} setFileList={setImageList} setValue={setValue} />
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>

            <Col md="6" className="input-box">
              <Label>Upload PDF Image</Label>
              <ImageUpload name="pdf" accept="application/pdf" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
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
