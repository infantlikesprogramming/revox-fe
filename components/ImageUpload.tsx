"use client";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import ImageKit from "imagekit";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast.error("Image upload failed", {
      description: "Your image could not be uploaded. Please try again.",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="image.png"
        folder="/engvietst"
      />

      <Button
        className="w-35 bg-[#2582e6] hover:bg-[#1f74cf] active:bg-[#1b66b5] "
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-sm  text-light-100"> Tải ảnh lên</p>
      </Button>

      {file && (
        <div className=" w-60 aspect-[16/9] relative overflow-hidden">
          <IKImage
            key={file.filePath}
            alt={file.filePath}
            path={file.filePath}
            transformation={[
              { width: 720, height: 480, focus: "auto" },
              { quality: 10 },
            ]}
            loading="lazy"
            className="  rounded-lg"
            urlEndpoint={config.env.imagekit.urlEndpoint}
          />
        </div>
      )}
    </ImageKitProvider>
  );
};
export default ImageUpload;
