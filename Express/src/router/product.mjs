import {Router} from 'express';
import DB from '../db/db.mjs';
import { comPValidate, comValidate } from '../utils/validatorMiddleware.mjs';
import { validationResult, matchedData  } from 'express-validator';
import { resError } from '../utils/error-creator.mjs';

const productRouter = Router()

//Get all products
productRouter.get('/allProducts', async (req, res)=>{
    try{
        const productData = await DB.product.findMany({
            select: {
                Name: true,
                Price: true,
                User: {
                    select: {
                        Name: true,
                        Username: true
                    }
                }
            }
        })
        return res.status(200).json({
            msg: 'Get All Products',
            error: null,
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
productRouter.get('/byProductId/:id',
    comPValidate('id'),
    async (req, res)=> {
        const error = validationResult(req);
        const err = resError(error.array());

        if(error.array().length) {
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null
            })
        }
        const {id} = req.params
        if(!id){
            return res.status(400).json({
                msg: 'Product ID is required',
                data: null,
            })
        }

    try{
        const productData = await DB.product.findUnique({
            select: {
                Name: true,
                User: {
                    select: {
                        Name: true,
                        UserName: true
                    }
                }
            }
        })
        return res.status(200).json({
            msg: 'Get Product by ID',
            error: null,
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

//Create new Product
productRouter.post(
    "/create",
    comValidate("Name", "UserId","Price"),
    async (req, res) => {
        const error = validationResult(req);
        const err = resError(error.array());

        if(error.array().length){
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null
            })
        }
        const data = matchedData(req);
        console.log(data);

        try {
            const newProduct = await DB.product.create({
                data: {
                    UserId: Number(data.UserId),
                    Name: data.Name,
                    Price: parseFloat(data.Price),
                },
            });

            return res.status(201).json({
                msg: "New Product Created",
                error: null,
                data: newProduct,
            })
        } catch(error){
            console.log(error);
            return res.status(400).json({
                msg: "error",
                error: "Failed to Create product",
                data:null
            })
        }
    }
)

//Update product by ID

productRouter.put(
    '/update-product/:id',
    comPValidate('id'),
    comValidate("Name","UserId","Price"),
    async (req, res)=>{
        const error = validationResult(req);
        const err = resError(error.array());

        if(error.array().length) {
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null
        })
        }

        const {id} = req.params;
        const data = matchedData(req)

        if(!id){
            return res.status(400).json({
                msg: 'Product ID is required',
                data: null,
            })
        }

    try{
        const updatedProduct = await DB.product.update({
            data: {
                Name: data.Name,
                UserId: Number(data.UserId),
                Price: parseFloat(data.Price)
            },
            where: {
                Id: Number(id),
            }
        })
        return res.status(200).json({
            msg: 'Product updated successfully',
            error: null,
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
productRouter.delete(
    '/delete-product/:id',
    comPValidate("UserId"),
    async (req, res)=>{
        const error = validationResult(req)
        const err = resError(error.array());

        if(error.array().length) {
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null
            })
        }
        const {id} = req.query
        if(!id){
            return res.status(400).json({
                msg: 'Product ID is required',
                data: null,
            })
        }

    try{
        const deletedProduct = await DB.product.delete({
            where: {
                Id: Number(data.id)
            },
            select: {
                Name: true
            }
        })
        return res.status(200).json({
            msg: 'Product deleted successfully',
            error: null,
            data: `${deletedProduct.AccountDetails.Name}'s profile deleted.`
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