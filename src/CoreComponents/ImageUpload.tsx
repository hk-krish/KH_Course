import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { Image, message, Upload } from "antd";
import React, { FC, useState } from "react";
import { Post } from "../Api";
import { Url_Keys } from "../Constant";
import Delete from "../Api/Delete";
import { UploadListType } from "antd/es/upload/interface";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ImageUploadProps {
  fileList: string[];
  setFileList: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
  setValue?: any;
  name: string;
  trigger: any;
  accept?: string;
  isListType?: UploadListType;
}

const ImageUpload: FC<ImageUploadProps> = ({ fileList, setFileList, multiple, setValue, name, trigger, accept, isListType }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customUpload: UploadProps["beforeUpload"] = async (file) => {
    const isPdf = file.type === "application/pdf";

    // Only allow PDF if the field is for PDF
    if (name === "pdf" && !isPdf) {
      message.error("Only PDF files are allowed.");
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await Post(Url_Keys.Upload.Upload, formData);
      const uploadedUrl = response.data;

      const updatedList = [...fileList, uploadedUrl];
      setFileList(updatedList);
      setValue?.(name, updatedList);
      trigger?.(name);
    } catch (error) {}

    return false;
  };

  const removeFile = async (imageSrc: string) => {
    try {
      const updatedList = fileList.filter((img) => img !== imageSrc);
      await Delete(Url_Keys.Upload.Delete, { imageUrl: imageSrc });
      setFileList(updatedList);
      setValue?.(name, updatedList);
      trigger?.(name);
    } catch (err) {}
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        accept={accept}
        listType={isListType ?? "picture-card"}
        fileList={fileList.map((url, index) => ({
          uid: String(index),
          name: `file-${index}${name === "pdf" ? ".pdf" : ".jpg"}`,
          status: "done",
          url,
        }))}
        beforeUpload={customUpload}
        onPreview={handlePreview}
        onRemove={(file) => {
          if (file.url) removeFile(file.url);
        }}
        multiple={multiple}
      >
        {multiple || fileList.length < 1 ? uploadButton : null}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUpload;
