import { filterOptions } from "@/config";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filter, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-base font-bold ">Category</h3>
          <div className="grid gap-2 mt-2 ">
            {(filterOptions?.category ?? []).map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(filter?.category ?? []).includes(opt.id)}
                  onChange={() => handleFilter("category", opt.id)}
                />
                <span className="font-semibold cursor-pointer">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <h3 className="text-base font-bold ">Brand</h3>
          <div className="grid gap-2 mt-2 ">
            {(filterOptions?.brand ?? []).map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(filter?.brand ?? []).includes(opt.id)}
                  onChange={() => handleFilter("brand", opt.id)}
                />
                <span className="font-semibold cursor-pointer">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default ProductFilter;
