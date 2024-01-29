const express = require('express');
const router = express.Router();

// admin login routes imports
const { registration, adminLogin, signOut } = require ("../controller/controller.js");

// store/product creation routes imports
const { createStore, getAllStores, getOneStore, updateStore, deleteStore} = require ("../controller/storecontrol.js");

// poduct routes
const { createProduct, getOne, getAll, updateProduct, getOneProductByStore, deleteProduct } = require("../controller/product.js")


// authentication routes imports // userAuth is for checking token for authorization
const { loginAuth, authenticator, userAuth } = require("../controller/authorization.js")


// admin  routes// for signup
router.post("/create", registration);
// for login
router.post("/login", adminLogin);
// for logout
router.put("/:id/logout", signOut);


// store routes
// for creating stores // has auth for login, and for authenticating user details, 
router.post("/:userId/createstore/:id", loginAuth, authenticator, userAuth, createStore);
// getting all created stores
router.get("/allstores", getAllStores);
// getting one store
router.get("/onestore/:_id", getOneStore);
// updating store details
router.put("/:storeId/:userId/update/:id", loginAuth, authenticator, userAuth, updateStore);
// delete store from database
router.delete("/:storeID/:userId/delete/:id", loginAuth, authenticator, userAuth, deleteStore);



// product routes
// for creating products, // has auth to check login and to check token for authorization.
router.post("/:userId/:_id/product/:id", loginAuth, userAuth, authenticator, createProduct);
router.get("/getoneproduct/:productID", getOne);
router.get("/getallproducts",  getAll);
router.put("/:productId/:userId/:id/update", loginAuth, userAuth, authenticator, updateProduct);
router.get("/:storeID/getonebystore/:productID",  getOneProductByStore);
router.delete("/:productID/:userId/deleteproduct/:id", loginAuth, authenticator, userAuth, deleteProduct);

module.exports = router