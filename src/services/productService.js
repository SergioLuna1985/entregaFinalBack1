import { ProductModel } from "../models/product.model.js";

const getProducts = async ({filters = '', page = 1, limit = 10, sortOptions = 'asc'}) => {
    try {
        return await ProductModel.find(filters)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort(sortOptions);

    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (pId) => {
    try {
        return await ProductModel.findById(pId).lean()  
    } catch (error) {
        console.log(error)
    }
}

const saveProduct = async (product) => {   
    try {
        await ProductModel.create(product)
    } catch (error) {
        console.log('error al intentar guardar el/los productos', error)
    }
}

const deleteProduct = async (pId) => { 
    try {
        return await ProductModel.findByIdAndDelete(pId)
    } catch (error) {
        console.log(error)
    }
}

export { getProducts, getProductById, saveProduct, deleteProduct }



