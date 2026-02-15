import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ImageUploader({
  imageUploaderUrl,
  setsetImageUploaderUrl,
  imageFile,
  setimageFile,
  setImageUploadLoading,
  imageUploadLoading
}) {
  const inputRef = useRef(null);

  // ---------------- FILE SELECT ----------------
  function handleImageFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setimageFile(selectedFile);
    }
  }

  // ---------------- DRAG & DROP ----------------
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setimageFile(file);
    }
  }

  // ---------------- REMOVE IMAGE ----------------
  function handleRemoveImage() {
    setimageFile(null);
    setsetImageUploaderUrl("");
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  }

  // ---------------- UPLOAD IMAGE ----------------
  async function UploadToCloudinary(file) {
    try {
      setImageUploadLoading(true);

      const data = new FormData();
      data.append("myfile", file);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/image-upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Upload success:", response.data);

      if (response.data.success) {
        setsetImageUploaderUrl(response.data.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageUploadLoading(false);
    }
  }

  // ---------------- EFFECT ----------------
  useEffect(() => {
    if (imageFile) {
      UploadToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mt-4 mx-auto px-4">
      <label className="text-lg font-semibold mb-2 block">
        Upload Image
      </label>

      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="imageUpload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <label
            htmlFor="imageUpload"
            className="flex flex-col justify-center items-center cursor-pointer h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Browse Image</span>
          </label>
        ) : imageUploadLoading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      {/* Uploaded Image Preview */}
      {imageUploaderUrl && (
        <img
          src={imageUploaderUrl}
          alt="Uploaded"
          className="mt-4 w-full rounded-md"
        />
      )}
    </div>
  );
}

export default ImageUploader;
