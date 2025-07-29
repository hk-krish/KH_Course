import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleStudentsApiData, setSingleEditingIdStudents, setStudentsModal } from "../../ReduxToolkit/Slice/StudentsSlice";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import { StudentsFormData } from "../../Types/Students";
import { StudentsSchema } from "../../Utils/ValidationSchemas";
import ImageUpload from "../../CoreComponents/ImageUpload";

const StudentsModel: FC<ModalPassPropsType> = ({ getApi, isEdit, setEdit }) => {
  const [fileList, setFileList] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { isStudentsModal, singleEditingIdStudents, singleStudentsData } = useAppSelector((state) => state.students);

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
    if (singleStudentsData && isEdit) {
      setValue("firstName", singleStudentsData?.firstName);
      setValue("lastName", singleStudentsData?.lastName);
      setValue("email", singleStudentsData?.email);
      setValue("phoneNumber", singleStudentsData?.phoneNumber);
      setValue("password", singleStudentsData?.confirmPassword);
      if (singleStudentsData?.image) {
        setValue("image", [singleStudentsData?.image]);
        setFileList([singleStudentsData?.image]);
        trigger("image");
      }
    }
  }, [isEdit, setValue, singleStudentsData, trigger]);

  const onCloseModal = () => {
    dispatch(setStudentsModal());
    dispatch(setSingleEditingIdStudents(null));
    reset();
    setFileList([]);
    setEdit(false);
  };

  const onSubmit = async (data: StudentsFormData) => {
    const Students: any = {};
    if (data.firstName) Students.firstName = data.firstName;
    if (data.lastName) Students.lastName = data.lastName;
    if (data.email) Students.email = data.email;
    if (data.phoneNumber) Students.phoneNumber = data.phoneNumber;
    if (data.password) Students.password = data.password;
    if (fileList[0]) Students.image = fileList[0];
    try {
      const response = isEdit ? await Post(Url_Keys.Students.Edit, { id: singleStudentsData._id, ...Students }) : await Post(Url_Keys.Students.Add, Students);
      if (response?.status === 200) {
        onCloseModal();
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

  return (
    <Modal size="xl" centered isOpen={isStudentsModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit" : "Add"} Students
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="StudentsForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box row justify-content-center profile-image pt-3">
              <ImageUpload name="image" isListType="picture-circle" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
              <Label className="text-center pt-2">Upload Profile Image</Label>
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>
                First Name <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter First Name" {...register("firstName")} />
              {errors.firstName && <p className="text-danger mt-1">{errors.firstName.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>
                Last Name <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Last Name" {...register("lastName")} />
              {errors.lastName && <p className="text-danger mt-1">{errors.lastName.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>Your Email</Label>
              <input type="text" placeholder="Enter Your Email" {...register("email")} />
              {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
            </Col>
            <Col md="6" className="input-box">
              <Label>
                Phone Number <span className="required">*</span>
              </Label>
              <input placeholder="Phone Number" {...register("phoneNumber")} />
              {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
            </Col>
            <Col md="6">
              <div className="input-box">
                <Label>
                  Password <span className="required">*</span>
                </Label>
                <input type="text" {...register("password")} placeholder="Enter New Password" />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>
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
