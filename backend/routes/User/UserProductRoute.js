import express from "express";
import { FilteredController, UserProductController , getProductsDetails} from "../../controller/User/UserProductController.js"

export const router = express.Router()

router.get('/get', UserProductController)
router.get('/filter',FilteredController)
router.get("/get/:id",getProductsDetails)

export default router