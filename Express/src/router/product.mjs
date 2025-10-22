import {Router} from "express";
import {productInfo} from "../data/productinfo.mjs"

const productRouter = Router()

//Get all products
productRouter.get('/allProducts', async (req, res)=>{
    try{
        const productData = await DB.product.findMany()
        return res.status(200).json({
            msg: 'Get All Products',
            data: productData,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to fetch Products',
            data: null,
        })
    }
})

//Get product by ID
productRouter.get('/byProductId/:id', async (req, res)=> {
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            msg: 'Product ID is required',
            data: null,
        })
    }
    try{
        const productData = await DB.product.findUnique({
            where: {Id: Number(id)}
        })
        return res.status(200).json({
            msg: 'Get Product by ID',
            data: productData,
        }) 

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to fetch Product by ID',
            data: null,
        })
    }
})

//Update product by ID

productRouter.put('/update-product', async (req, res)=>{
    const {id} = req.query
    if(!id){
        return res.status(400).json({
            msg: 'Product ID is required',
            data: null,
        })
    }

    try{
        const updatedProduct = await DB.product.update({
            where: {Id: Number(id)},
            data: req.body,
        })
        return res.status(200).json({
            msg: 'Product updated successfully',
            data: updatedProduct,
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to update Product',
            data: null,
        })
    }
})

//Delete product by ID
productRouter.delete('/delete-product', async (req, res)=>{
    const {id} = req.query
    if(!id){
        return res.status(400).json({
            msg: 'Product ID is required',
            data: null,
        })
    }

    try{
        const deletedProduct = await DB.product.delete({
            where: {Id: Number(id)},
        })
        return res.status(200).json({
            msg: 'Product deleted successfully',
            data: deletedProduct,
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to delete Product',
            data: null,
        })
    }
})

export default productRouter;