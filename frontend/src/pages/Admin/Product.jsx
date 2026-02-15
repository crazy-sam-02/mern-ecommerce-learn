import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { useState } from "react";

import { addProductFormElements } from "@/config/index.js";
import CommonForm from "@/components/common/form";
import ImageUploader from "@/components/Admin/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchAllProduct,
} from "@/components/Store/products/products";
import { toast } from "sonner";
import ProductCard from "@/components/Admin/ProductCard";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProduct() {
  const [createProductDialog, setcreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setimageFile] = useState();
  const [imageUploaderUrl, setsetImageUploaderUrl] = useState();
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [currentDeleteID, setCurrentDeleteID] = useState(null)
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.AdminProduct);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(addNewProduct({ ...formData, image: imageUploaderUrl })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          setcreateProductDialog(false);
          setFormData(initialFormData);
          setimageFile(null);
          setsetImageUploaderUrl(null);
          setImageUploadLoading(false);
          toast.success("Product added successfully");
        } else {
          toast.error("Something went wrong");
        }
      }
    );
  }

  return (
    <>
      <div className="flex justify-end mt-2 me-2">
        <button
          onClick={() => {
            setcreateProductDialog(true);
          }}
          className="bg-blue-950 rounded text-white px-4 py-2"
        >
          Add New Product
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                setcreateProductDialog={setcreateProductDialog}
                setsetImageUploaderUrl={setsetImageUploaderUrl}
                setFormData={setFormData}
                setimageFile={setimageFile}
                setImageUploadLoading={setImageUploadLoading}
                imageUploadLoading={imageUploadLoading}
                setCurrentEditId={setCurrentEditId}
                setCurrentDeleteID={setCurrentDeleteID}
              />
            ))
          : null}
      </div>
      <Sheet
        open={createProductDialog}
        onOpenChange={() => {
          setcreateProductDialog(false);
          setCurrentEditId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              {currentEditId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUploader
            imageFile={imageFile}
            setimageFile={setimageFile}
            imageUploaderUrl={imageUploaderUrl}
            setsetImageUploaderUrl={setsetImageUploaderUrl}
            setImageUploadLoading={setImageUploadLoading}
            imageUploadLoading={imageUploadLoading}
            createProductDialog={createProductDialog}
            setFormData={setFormData}
          />
          <div className="py-6 px-3">
            <CommonForm
              formControls={addProductFormElements}
              setFormData={setFormData}
              formData={formData}
              onSubmit={onSubmit}
              buttonText={currentEditId ? "Update" : "Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;
