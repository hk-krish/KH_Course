import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleBannerApiData, setBannerModal, setSingleEditingIdBanner } from "../../ReduxToolkit/Slice/BannerSlice";
import { BannerSchema } from "../../Utils/ValidationSchemas";
import { BannerFormData } from "../../Types/Banner";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { ModalPassPropsType } from "../../Types/CoreComponents";

const BannerModel: FC<ModalPassPropsType> = ({ getApi }) => {
  const { isBannerModal, singleEditingIdBanner, singleBannerData } = useAppSelector((state) => state.banner);
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
    resolver: yupResolver(BannerSchema),
  });

  useEffect(() => {
    if (singleBannerData) {
      setValue("title", singleBannerData?.title);
      setValue("action", singleBannerData?.action);
      setValue("youtubeLink", singleBannerData?.youtubeLink);
      if (singleBannerData?.image) {
        setValue("image", [singleBannerData?.image]);
        setFileList([singleBannerData?.image]);
        trigger("image");
      }
    }
  }, [setValue, singleBannerData, trigger]);

  const onCloseModal = () => {
    dispatch(setBannerModal());
    dispatch(setSingleEditingIdBanner(null));
    reset();
    setFileList([]);
  };

  const onSubmit = async (data: BannerFormData) => {
    const banner: any = {};
    if (data.title) banner.title = data.title;
    if (data.youtubeLink) banner.youtubeLink = data.youtubeLink;
    if (data.action) banner.action = data.action;
    if (fileList[0]) banner.image = fileList[0];
    try {
      const response = singleEditingIdBanner ? await Post(Url_Keys.Banner.Edit, { id: singleBannerData._id, ...banner }) : await Post(Url_Keys.Banner.Add, banner);
      if (response?.status === 200) {
        onCloseModal();
        trigger("image");
        getApi();
      }
    } catch (error) {}
  };

  const getSingleBanner = useCallback(async () => {
    try {
      await dispatch(fetchSingleBannerApiData({ id: singleEditingIdBanner }));
    } catch (error) {}
  }, [dispatch, singleEditingIdBanner]);

  useEffect(() => {
    if (singleEditingIdBanner) getSingleBanner();
  }, [getSingleBanner, singleEditingIdBanner]);

  return (
    <Modal size="md" centered isOpen={isBannerModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Banner
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <Form id="bannerForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <Col md="12" className="input-box">
              <Label>Banner Title</Label>
              <input type="text" placeholder="Enter Banner Title" {...register("title")} />
              {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
            </Col>

            <Col md="12" className="input-box">
              <Label>
                Youtube Link <span className="required">*</span>
              </Label>
              <input type="text" placeholder="Enter Youtube Link" {...register("youtubeLink")} />
              {errors.youtubeLink && <p className="text-danger mt-1">{errors.youtubeLink.message}</p>}
            </Col>

            <Col md="12" className="input-box">
              <Label>
                Upload Images <span className="required">*</span>
              </Label>
              <ImageUpload name="image" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
              {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
            </Col>

            <Col md="12" className="input-box">
              <CustomCheckbox register={register} title="Action" name="action" />
            </Col>
          </Form>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="right-part">
          <Button type="submit" form="bannerForm" color="primary">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default BannerModel;
