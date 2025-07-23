import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomCheckbox from "../../CoreComponents/CustomCheckbox";
import ImageUpload from "../../CoreComponents/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchSingleBannerApiData, setBannerModal } from "../../ReduxToolkit/Slice/BannerSlice";
import { BannerSchema } from "../../Utils/ValidationSchemas";
import { BannerFormData } from "../../Types/Banner";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";

const BannerModel = () => {
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

;

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
  }, [getSingleBanner, singleEditingIdBanner])

  return (
    <Modal fade modalClassName="media-modal theme-modal" size="md" centered isOpen={isBannerModal} toggle={onCloseModal}>
      <ModalHeader tag="h2">
        Insert Media
        <Button type="button" className="btn-close" onClick={onCloseModal}>
          <span className="lnr lnr-cross" />
        </Button>
      </ModalHeader>
      <ModalBody>
        <div className="input-items">
          <form id="bannerForm" className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
              <div className="input-box">
                <h6>Banner Title</h6>
                <input type="text" placeholder="Enter Banner Title" {...register("title")} />
                {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
              </div>
            </div>

            <div className="col-12">
              <div className="input-box">
                <h6>
                  Youtube Link <span className="required">*</span>
                </h6>
                <input type="text" placeholder="Enter Youtube Link" {...register("youtubeLink")} />
                {errors.youtubeLink && <p className="text-danger mt-1">{errors.youtubeLink.message}</p>}
              </div>
            </div>

            <div className="col-12">
              <div className="input-box">
                <h6>
                  Upload Images <span className="required">*</span>
                </h6>
                <ImageUpload name="image" trigger={trigger} fileList={fileList} setFileList={setFileList} setValue={setValue} />
                {errors.image && <p className="text-danger mt-1">{errors.image.message}</p>}
              </div>
            </div>

            <div className="col-12">
              <CustomCheckbox register={register} title="Action" name="action" />
            </div>
          </form>
        </div>
      </ModalBody>

      <div className="modal-footer">
        <div className="right-part">
          <Button type="submit" form="bannerForm" className="btn btn-dashed">
            Insert Media
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BannerModel;
