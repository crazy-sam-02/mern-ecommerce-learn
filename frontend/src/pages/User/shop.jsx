import {
  userProductsThunk,
  userFilterProductsThunk,
  getProductsDetailsThunk,
} from "@/components/Store/User/ProductSlice/products";
import ProductDetails from "@/components/User/ProductDetails";
import ProductFilter from "@/components/User/ProductFilter";
import UserProductCard from "@/components/User/UserProductCard";
import { sortOptions } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productCard from "./../../components/Admin/productCard";
import { addToCart } from "@/components/Store/User/CartSlice/cart";
import { toast } from "sonner";

function Usershop() {
  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector(
    (state) => state.userproducts,
  );
  const { user } = useSelector((state) => state.Auth);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState({ category: [], brand: [] });
  const [openproductdetail, setOpenproductdetail] = useState(false);

  function handleSort(value) {
    setSort(value);
    console.log(value);
  }
  useEffect(() => {
    if (productDetail) {
      setOpenproductdetail(true);
    }
  }, [productDetail]);
  function sortProducts(products, sortKey) {
    if (!sortKey) return products;
    const items = [...products];
    const priceOf = (p) => p?.price ?? 0;
    switch (sortKey) {
      case "price-lowtohigh":
        items.sort((a, b) => priceOf(a) - priceOf(b));
        break;
      case "price-hightolow":
        items.sort((a, b) => priceOf(b) - priceOf(a));
        break;
      case "title-atoz":
        items.sort((a, b) => (a?.title || "").localeCompare(b?.title || ""));
        break;
      case "title-ztoa":
        items.sort((a, b) => (b?.title || "").localeCompare(a?.title || ""));
        break;
      default:
        break;
    }
    return items;
  }

  function getProductDetail(currenProductID) {
    if (!currenProductID) return;
    dispatch(getProductsDetailsThunk(currenProductID));
  }
  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      toast.error("Please login to add items to cart");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    )
      .then((result) => {
        if (result.payload?.success) {
          toast.success("Product added to cart successfully!");
          console.log(result.payload);
        } else {
          toast.error(result.payload?.message || "Failed to add to cart");
        }
      })
      .catch((error) => {
        toast.error("Failed to add to cart");
        console.error("Cart error:", error);
      });
  }

  function handleFilter(getSectionId, getSectionOption) {
    setFilter((prev) => {
      const next = { ...prev };
      const items = new Set(next[getSectionId] ?? []);
      if (items.has(getSectionOption)) {
        items.delete(getSectionOption);
      } else {
        items.add(getSectionOption);
      }
      next[getSectionId] = Array.from(items);
      return next;
    });
  }

  useEffect(() => {
    dispatch(userProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    const hasFilters =
      (filter.category?.length ?? 0) || (filter.brand?.length ?? 0);
    if (hasFilters) {
      dispatch(
        userFilterProductsThunk({
          category: filter.category,
          brand: filter.brand,
        }),
      );
    } else {
      dispatch(userProductsThunk());
    }
  }, [dispatch, filter]);

  console.log(productDetail);

  return (
    <div className="grid  grid-cols-1  md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="font-medium text-stone-600">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="sort-trigger">
                  <ArrowUpDown />{" "}
                  <span className="font-semibold text-lg">Sort By</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="sort-content">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((opt) => (
                    <DropdownMenuRadioItem
                      className="sort-item"
                      key={opt.id}
                      value={opt.id}
                    >
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {sortProducts(productList, sort).map((product) => (
            <UserProductCard
              getProductDetail={getProductDetail}
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <ProductDetails
        open={openproductdetail}
        setOpen={setOpenproductdetail}
        productDetail={productDetail}
      />
    </div>
  );
}

export default Usershop;
