const storeModel = require("../models/storeModel");
const jwt = require ("jsonwebtoken")
const productModel = require("../models/productsModel");
const admin = require("../models/adminModel");


const createProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        // const { adminId } = req.params;
        const storeID = await storeModel.findById(_id);
        // const checkAdmin = await admin.findById(adminId);
        if (!storeID) {
            return res.status(404).json({
                message: "store not found"
            })
        } 
        // else if (checkAdmin.isLogin !== true) {
        //     return res.status(403).json({
        //         message: "admin is not logged in"
        //     })
        // }
            const cart = await productModel.create ({
                stores: req.params.id,
                productName: req.body.productName,
                price: req.body.price,
                productID: req.body.productID,
                quantity: req.body.quantity,
                category: req.body.category
            });
            if (!cart) {
                res.status(400).json({
                    message: "unable to create products/ unavailable fields"
                })
            } else {

            storeID.products.push(cart);
            await storeID.save();
            res.status(201).json({
                message: "cart successfully created",
                data: cart
            })
            }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const getOne = async (req, res) => {
    try {
        const { productID } = req.params;
        // if (!productName) {
        //     return res.status(404).json({
        //         message: "pls input a name to search"
        //     })
        // }
        const theProduct = await productModel.findById(productID);
        if (theProduct ) {
            res.status(200).json({
                message: "product with name available",
                data: theProduct
            })
        } else {
            res.status(404).json({
                message: "product with name not found"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const getAll = async (req, res) => {
    try {
        const allProducts = await productModel.find();
        if (!allProducts && allProducts.length === null) {
            return res.status(404).json({
                message: "no products found"
            })
        } else {
            res.status(200).json({
                message: "all available products",
                data: allProducts
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
   
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, price, productID, quantity, category } = req.body;

        const theProduct = await productModel.findById(productId);

        if (!theProduct) {
            return res.status(404).json({ 
                message: 'Product not found'});
        } 
        const data = {
            productName: req.body.productName || productName,
            price: req.body.price || price,
            productID: req.body.productID || productID,
            quantity: req.body.quantity || quantity,
            category: req.body.category || category
        } 
        const updatedProduct = await productModel.findByIdAndUpdate(productId, data, {new: true});
        if (!updatedProduct) {
            return res.status(404).json({
                message: "no update made to products"
            })
        }else {
            res.status(201).json({
                message: "successfully updated product details",
                data: updatedProduct
            })
        }

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }

}

const getOneProductByStore = async (req, res) => {
    try {

        const { storeID } = req.params;
        const { productID } = req.params;

        // check if store 
        const ifStore = await storeModel.findById(storeID);
        if (!ifStore) {
            return res.status(404).json({
                message: "Store not found"
            })
        } 

        const checkProduct = await productModel.findById(productID);
        if (!checkProduct) {
            res.status(404).json({
                message: "product not availabe"
            })
        } else {
            return res.status(200).json({
                message: "product availabe",
                data: checkProduct
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const deleteProduct = async (req, res) => {
    try {
        
        const { productID } = req.params;
        const product = await productModel.findById(productID)

        if (!product) {
            return res.status(404).json({
                message: "no such product available"
            })
        } 

        const deletedProduct = await productModel.findByIdAndDelete(productID);
        if (!deletedProduct) {
            return res.status(400).json({
                message: "unable to delete product"
            })
        } else {
            res.status(200).json({
                message: "successfully deleted"

            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

module.exports = { createProduct, getOne, getAll, updateProduct, getOneProductByStore, deleteProduct }
  