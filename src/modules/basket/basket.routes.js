import { Router } from "express";
import basketController from "./basket.controller.js";

const router = Router()

router.post('/add', basketController.addToBasket)
router.delete('/delete/:id', basketController.removeFromBasketById)
router.get('/', basketController.getUserBasket)
router.delete('/delete', basketController.removeFromBasket)


export { router as BasketRoutes }