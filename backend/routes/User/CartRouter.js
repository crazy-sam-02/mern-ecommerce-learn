import express from "express";
import { AddCartItems, DeleteCartItems, FetchCartItems, UpdateCartItems } from "../../controller/User/CartController.js";

export const router = express.Router()

router.post('/add',AddCartItems)
router.delete('/delete/:id',DeleteCartItems)
router.put('/update/:id',UpdateCartItems)
router.get('/get/:id',FetchCartItems)

