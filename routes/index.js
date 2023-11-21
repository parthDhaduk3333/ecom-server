import express from 'express';
import passport from 'passport';
import { CartController, CategoryController, LoginController, OrderController, ProductController, RegisterController } from '../controller';
import AuthCheck from '../middlewares/AuthCheck';
import User from '../models/User';
const router = express.Router();

// ================ Auth ====================
router.post('/login', passport.authenticate('local', { failureRedirect: '/fail'}),LoginController.login);
router.post('/register',RegisterController.register);
router.get('/fail', LoginController.loginFail);
// =================== categories ==================
router.get('/categories',CategoryController.categories)

// ================== subcategories ==============
router.get('/subcategories/:category',CategoryController.getSubCategory)

// ============ Country ==============
router.get('/countries',OrderController.getCountries)

// =============== Products ================
router.get('/products/:subCategory',ProductController.products);
router.get('/product/:product',ProductController.product);
router.get('/populerProduct',ProductController.populerProduct);

router.use(AuthCheck.login);
// =============== user =================
router.get('/user',LoginController.getUser );
router.post('/updateUser',LoginController.updateUser);

// =============== Home =================
router.get('/logout',LoginController.logout);

// =============== Orders ===============
router.post('/orders',OrderController.order);
router.get('/orders',OrderController.getorders);

// ============== Cart =================
router.post('/cart',CartController.cart);
router.get('/cart/:user',CartController.getCart);
router.post('/deletecart',CartController.delete);



export default router;