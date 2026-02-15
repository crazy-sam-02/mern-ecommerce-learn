import express from "express";
import {handleImageUpload ,addProduct,editProduct,deleteProduct,fetchAllProduct} from '../../controller/Admin/AdminProductController.js'
import {upload} from "../../config/cloudinary.js";


export const router = express.Router();

router.post("/image-upload",upload.single('myfile'),handleImageUpload)
router.post("/add-product",addProduct)
router.post("/edit-product/:id",editProduct)
router.delete("/delete-product/:id",deleteProduct)
router.get("/fetch-all-product",fetchAllProduct)


