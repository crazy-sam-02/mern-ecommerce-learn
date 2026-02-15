import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function UserProductCard({ product ,getProductDetail ,handleAddToCart}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative hover:scale-105 transition-all duration-300 ease-in-out" onClick={()=>{getProductDetail(product?._id)}}>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="object-cover w-full h-[300px]"
        />
      </div>

      <CardContent className="space-y-3">
        <div>
          <h2 className="text-xl font-bold">{product.title}</h2>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <span>{product.category}</span>
          <span>{product.brand}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            ₹{product.price}
          </span>
          <span className="text-sm">
            ⭐ {product.rating ?? "No Rating"}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick = {()=>(handleAddToCart(product?._id))}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default UserProductCard;