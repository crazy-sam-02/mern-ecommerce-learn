import Product from "../../models/products.js";

export const UserProductController = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "product fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "something went wrong",
      success: false,
    });
  }
};

export const FilteredController = async (req, res) => {
  try {
    const { category, brand } = req.query;

    // Normalize query params to arrays
    const categories = Array.isArray(category)
      ? category
      : typeof category === "string"
      ? category.split(",")
      : [];

    const brands = Array.isArray(brand)
      ? brand
      : typeof brand === "string"
      ? brand.split(",")
      : [];

    // Build mongoose filter using $in with arrays
    const query = {};
    if (categories.length) {
      query.category = { $in: categories };
    }
    if (brands.length) {
      query.brand = { $in: brands };
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getProductsDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const productDetail = await Product.findById(id);
    if (!productDetail) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product Details Fetched Successfully",
      productDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Something Went Wrong While Reaching The Product Details",
    });
  }
};
