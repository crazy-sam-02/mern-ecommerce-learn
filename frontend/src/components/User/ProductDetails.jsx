import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ProductDetails({ open, setOpen, productDetail }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-8 lg:p-12 max-w-[95vw] lg:max-w-[80vw] xl:max-w-[75vw] max-h-[90vh] overflow-y-auto">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 self-start lg:sticky lg:top-0">
          <img
            src={productDetail?.image}
            alt={productDetail?.title}
            className="aspect-square object-cover w-full hover:scale-105 transition-transform duration-300"
            width={486}
            height={486}
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col space-y-4">
          {/* Title and Description */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {productDetail?.title}
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              {productDetail?.description}
            </p>
          </div>

          {/* Pricing Section */}
          <div className="flex items-center gap-4 py-2">
            <p className="text-2xl lg:text-3xl font-bold text-green-600">
              ₹{productDetail?.price}
            </p>
            {productDetail?.SalePrice && (
              <p className="text-xl lg:text-2xl font-semibold text-gray-400 line-through">
                ₹{productDetail?.SalePrice}
              </p>
            )}
            {productDetail?.SalePrice && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                Save ₹{productDetail?.SalePrice - productDetail?.price}
              </span>
            )}
          </div>

          {/* Product Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">
            <div className="flex flex-col space-y-1 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Category
              </span>
              <span className="text-sm font-semibold text-gray-900 capitalize">
                {productDetail?.brand}
              </span>
            </div>
            <div className="flex flex-col space-y-1 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Brand
              </span>
              <span className="text-sm font-semibold text-gray-900 capitalize">
                {productDetail?.category}
              </span>
            </div>
            <div className="flex flex-col space-y-1 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Rating
              </span>
              <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                ⭐ {productDetail?.rating || "No Rating"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 h-12 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200 shadow-md hover:shadow-lg">
              Add to Cart
            </button>
            <button className="flex-1 h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Buy Now
            </button>
          </div>

          <Separator className="my-4" />

          {/* Reviews Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h3>

            {/* Reviews List with Max Height and Scroll */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Review 1 */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-black text-white font-bold text-sm">
                      SH
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-bold text-gray-900">
                    Sambath Hema
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This is Product is Awesome
                </p>
              </div>

              {/* Review 2 */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-black text-white font-bold text-sm">
                      SH
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-bold text-gray-900">
                    Sambath Hema
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This is Product is Awesome
                </p>
              </div>

              {/* Review 3 */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-black text-white font-bold text-sm">
                      SH
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-bold text-gray-900">
                    Sambath Hema
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This is Product is Awesome
                </p>
              </div>
            </div>

            {/* Add Review Section */}
            <div className="flex gap-2 pt-2">
              <Input
                type="text"
                placeholder="Write your review here..."
                className="flex-1 h-11 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <Button className="h-11 px-6 bg-blue-600 hover:bg-blue-700 font-semibold shadow-md">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
