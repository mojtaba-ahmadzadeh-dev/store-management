import { Router } from "express";
import basketController from "./basket.controller.js";
import { authGuard } from "../../middlewares/guard/auth.guard.js";

const router = Router()

router.post('/add', authGuard(), basketController.addToBasket)
router.get('/', basketController.getUserBasket)
router.delete('/delete/:id', authGuard(), basketController.removeFromBasketById)
router.get('/', authGuard(), basketController.getUserBasket)
router.delete('/delete', authGuard(), basketController.removeFromBasket)


export { router as BasketRoutes }