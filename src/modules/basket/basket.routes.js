import { Router } from "express";
import basketController from "./basket.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router()

router.post('/add', authGuard(), basketController.addToBasket)
router.delete('/delete/:id', basketController.removeFromBasketById)
router.get('/', basketController.getUserBasket)
router.delete('/delete', basketController.removeFromBasket)


export { router as BasketRoutes }