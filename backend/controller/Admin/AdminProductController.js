import { imageUploadUtil } from "../../config/cloudinary.js";
import Product from "../../models/products.js";

export const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image received",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(dataUrl);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//add a product

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      brand,
      salePrice,
      totalStock,
      image,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      brand,
      SalePrice: salePrice,
      totalStock,
      image,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      category,
      brand,
      salePrice,
      totalStock,
      image,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.SalePrice =
      salePrice === "" ? 0 : salePrice || findProduct.SalePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Delete by id using model API; document#deleteOne expects options object
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//fetch all product
export const fetchAllProduct = async (req, res) => {
  try {
    const ListOfProducts = await Product.find({});
    return res.status(200).json({
      success: true,
      data: ListOfProducts,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
