import Cart from "../../models/Cart.js";
import Product from "./../../models/products.js";

export const AddCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("Received cart data:", { userId, productId, quantity });

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "please enter all the fields",
        success: false,
        received: { userId, productId, quantity },
      });
    }
    const product = await Product.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ message: "the product does not exist", success: false });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({
        productId,
        quantity,
        totalAmount: product.price * quantity,
      });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
      cart.items[findCurrentProductIndex].totalAmount =
        product.price * cart.items[findCurrentProductIndex].quantity;
    }

    await cart.save();

    return res.status(200).json({
      message: "the cart items is added successfully",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({
      message:
        "there is a error ocurred while add a cart item from internal server",
      success: false,
      error: error.message,
    });
  }
};
export const UpdateCartItems = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { userId, quantity } = req.body;

    if (!userId || !productId || quantity < 0) {
      return res.status(400).json({
        message: "please enter all the fields",
        success: false,
      });
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "the cart is not found",
        success: false,
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        message: "the product is not found in the cart",
        success: false,
      });
    }

    // Get product to calculate totalAmount
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    cart.items[findCurrentProductIndex].totalAmount = product.price * quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "title image price ",
    });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : null,
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity ? item.quantity : null,
      totalAmount: item.totalAmount ? item.totalAmount : null,
    }));

    return res.status(200).json({
      message: "the cart is updated successfully",
      success: true,
      cart: populatedCartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "there is a error ocurred while add a cart item from internal server",
    });
  }
};

export const DeleteCartItems = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { userId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "please enter all the fields",
        success: false,
      });
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "the cart is not found",
        success: false,
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "title image price",
    });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : null,
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity ? item.quantity : null,
      totalAmount: item.totalAmount ? item.totalAmount : null,
    }));

    return res.status(200).json({
      message: "the item is deleted successfully",
      success: true,
      cart: populatedCartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "there is a error ocurred while deleting cart item from internal server",
    });
  }
};

export const FetchCartItems = async (req, res) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: "please provide the userID properly",
        success: false,
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price",
    });
    if (!cart) {
      return res.status(404).json({
        message: "the cart is not exist",
        success: false,
      });
    }
    const validCartItems = cart.items.filter((item) => item.productId);
    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }
    const populatedCartItems = validCartItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
    }));

    return res.status(200).json({
      message: "the cart is fetched successfully",
      success: true,
      cart: populatedCartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "there internal server error ocured while fetching the cart items",
    });
  }
};
