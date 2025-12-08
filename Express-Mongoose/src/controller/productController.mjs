import {Router} from "express";
import Product from '../model/productModel.mjs'

const productRouter = Router();

productRouter.get('/all', async(req,res)=> {
    try{
        const allProducts = await Product.find();
        return res.status(200).json({
            message: "Products retrieved successfully",
            status: "Success",
            data: allProducts
        });
    }catch(err) {
        res.status(500).json({
                message: err.message,
                status: "Failed"
            });
    }
})

productRouter.post('/', async(req,res)=> {
    const data = req.body;
    try{
        const newProduct = await Product.create(data);
        return res.status(201).json({
            message: "Product created successfully",
            status: "Success",
            data: newProduct
        });
    }catch(err) {
        res.status(500).json({
                message: err.message,
                status: "Failed"
            });
    }
})

export default productRouter;