const storeModel = require("../models/storeModel");
const jwt = require ("jsonwebtoken")
const productModel = require("../models/productsModel");
const admin = require("../models/adminModel");

const createStore = async (req, res) => {
    try {
        const { storeName } = req.body;
        const findStore = await storeModel.findOne({storeName});
        if (findStore) {
            res.status(400).json({
                message: `store with name ${storeName} already exists`
            })
        } else {
            const data = {
                storeName
            }
            const newStore = await storeModel.create(data)
            res.status(200).json({
                message: "store successfully created",
                data: newStore

            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const getAllStores = async (req, res) => {
    try {
        const allstores = await storeModel.find();

        if (!allstores && allstores.length === null) {
            res.status(400).json({
                message: "no stores found"
            })
        } else {
            res.status(200).json({
                message: "all available stores found",
                data: allstores
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const getOneStore = async (req, res) => {
    try {
        const { _id } = req.params;
        const oneStore = await storeModel.findById(_id);
        if (!oneStore) {
            res.status(404).json({
                message: "no store with such name found"
            })
        } else {
            res.status(200).json({
                message: "store with name/id found",
                data: oneStore 
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const updateStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { storeName } = req.body;

        
        if (!storeName) {
            return res.status(400).json({
                message: "store name is required"
            })
        } 

        const theStore = await storeModel.findById(storeId);
        if (!theStore) {
            return res.status(400).json({
                message: "No such store found"
            });
        }
        const updatedStore = await storeModel.findByIdAndUpdate(storeId, { storeName }, {new: true});
            if (!updatedStore) {
                res.status(400).json({
                    message: "unable to update store details"
                })
            } else {
                res.status(200).json({
                    message: "store updated successfully",
                    data: updatedStore
                })
            
         
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const deleteStore = async (req, res) => {
    try {
        const { storeID } = req.params;
        const store = await storeModel.findById(storeID);
        if (!store) {
            res.status(404).json({
                message: "no such store found"
            })
        } 
        const deletedStore = await storeModel.findByIdAndDelete(storeID);
        if (!deletedStore) {
            res.status(400).json({
                message: "unable to delete store from storage"
            })
        } else {
            res.status(200).json({
                message: "store details successfully deleted",
                data: deletedStore
            })
        }

        
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}




    
module.exports = { createStore, getAllStores, getOneStore, updateStore, deleteStore}