import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCartProduct,
  upadateCart,
  deleteCart,
} from "@/components/Store/User/CartSlice/cart.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.Auth);
  const { cartItems, isLoading } = useSelector((state) => state.userCartSlice);

  useEffect(() => {
    dispatch(fetchAllCartProduct({ userId: user.id }));
  }, []);

  const deleteCartitem = (productId) => {
    dispatch(deleteCart({ userId: user.id, productId }));
  };

  const increament = (item) => {
    const nextQuantity = item.quantity + 1;
    dispatch(
      upadateCart({
        userId: user.id,
        productId: item.productId,
        quantity: nextQuantity,
      }),
    );
  };

  const decreament = (item) => {
    if (item.quantity <= 1) {
      dispatch(deleteCart({ userId: user.id, productId: item.productId }));
      return;
    }

    const nextQuantity = item.quantity - 1;
    dispatch(
      upadateCart({
        userId: user.id,
        productId: item.productId,
        quantity: nextQuantity,
      }),
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 20000 ? 0 : 50;
  const tax = 18 / 100 * subtotal;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Review your items and proceed to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-slate-600">
                  Your cart is empty.
                </CardContent>
              </Card>
            ) : null}

            {cartItems.map((item) => {
              return (
                <Card
                  key={item.productId}
                  className="border-slate-200 shadow-sm"
                >
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="shrink-0 self-center sm:self-start">
                        <img
                          src={item?.image}
                          alt={item?.title}
                          width={150}
                          height={150}
                          className="rounded-xl object-cover w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 border border-slate-200"
                        />
                      </div>

                      {/* Product Details and Controls */}
                      <div className="flex-1 flex flex-col justify-between gap-4 min-w-0">
                        {/* Title and Price */}
                        <div className="space-y-1">
                          <h2 className="font-semibold text-lg md:text-xl text-slate-900 leading-snug truncate">
                            {item?.title}
                          </h2>
                          <p className="font-semibold text-base md:text-lg text-slate-700">
                            ₹ {item?.price}
                          </p>
                        </div>

                        {/* Quantity Controls and Delete */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-9 w-9"
                              onClick={() => decreament(item)}
                              disabled={isLoading}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-base min-w-8 text-center text-slate-900">
                              {item?.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-9 w-9"
                              onClick={() => increament(item)}
                              disabled={isLoading}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3 ml-auto sm:ml-0">
                            <p className="text-sm md:text-base font-semibold text-slate-900 whitespace-nowrap">
                              Total: ₹ {item?.price * item?.quantity}
                            </p>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => deleteCartitem(item?.productId)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-slate-200 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <div className="space-y-3 py-4 border-y border-slate-200">
                  <div className="flex justify-between text-slate-700">
                    <span>Items ({cartItems?.length}):</span>
                    <span>₹ {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Shipping:</span>
                    <span>₹ {shipping}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Tax(18%):</span>
                    <span>₹ {tax}</span>
                  </div>
                </div>

                <div className="flex justify-between text-slate-900 text-xl font-bold">
                  <span>Total:</span>
                  <span>₹ {grandTotal}</span>
                </div>

                <Button
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold"
                  onClick={() => navigate("/user/checkout")}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-800"
                  onClick={() => navigate("/user/shop")}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
