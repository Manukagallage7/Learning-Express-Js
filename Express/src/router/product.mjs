import {Router} from "express";
import {productInfo} from "../data/productinfo.mjs"

const productRouter = Router()

//Get all products
productRouter.get('/api/v1/product/allProducts',(req, res)=>{
    res.status(200).json({
        msg: 'get all products',
        data: productInfo,
    })
})

//Get product by ID
productRouter.get('/api/v1/product/byProductId/:id', (req, res)=> {
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            msg: 'Product ID is required',
            data: null,
        })
    }

    const product = productInfo.find(product => product.id === parseInt(id))
    return res.status(200).json({
        msg: 'get product by ID',
        data: productInfo,
    })
})

export default productRouter;