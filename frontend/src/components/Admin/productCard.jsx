import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useDispatch } from "react-redux";
import {deleteProduct, fetchAllProduct} from "@/components/Store/products/products";
import { toast } from "sonner";



function productCard({
  product,
  setcreateProductDialog,
  setFormData,
  setsetImageUploaderUrl,
  setimageFile,
  setImageUploadLoading,
  setCurrentEditId,
setCurrentDeleteID,

}) {
  function editProduct() {
    setcreateProductDialog(true);
    setCurrentEditId(product?._id || null);
    setFormData(product);
    setsetImageUploaderUrl(product?.image || "");
    setimageFile(null);
    setImageUploadLoading(false);
  }
  const dispatch = useDispatch();


  function deleteProductCard() {
    setCurrentDeleteID(product?._id || null)
    dispatch(deleteProduct(product?._id || null)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        toast.success("Product deleted successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card className="group rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-[200px] w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <CardContent className="p-4 sm:p-5">
        <h2 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {product?.title}
        </h2>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-lg font-semibold text-primary">
            {product?.price}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {product?.salePrice}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 p-4">
        <button
          onClick={editProduct}
          aria-label="Edit product"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
        >
          Edit
        </button>
        <button
        onClick={()=>{deleteProductCard()}}
          aria-label="Delete product"
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
        >
          Delete
        </button>
      </CardFooter>
    </Card>
  );
}

export default productCard;
