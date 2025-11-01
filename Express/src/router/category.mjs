import {Router} from 'express';
import DB from '../db/db.mjs';
import { comPValidate, comQValidate, comValidate } from '../utils/validatorMiddleware.mjs';
import { validationResult, matchedData  } from 'express-validator';
import { resError } from '../utils/error-creator.mjs';

const categoryRouter = Router()

//Get all products
categoryRouter.get('/allCategory', async (req, res)=>{
    try{
        const productData = await DB.category.findMany({
            select: {
                Name: true,
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
categoryRouter.get('/byProductId/:id',
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
categoryRouter.post(
    "/create",
    comValidate("Name"),
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
            const newCategory = await DB.category.create({
                data: {
                    Name: data.Name,
                },
            });

            return res.status(201).json({
                msg: "New Category Created",
                error: null,
                data: newCategory,
            })
        } catch(error){
            console.log(error);
            return res.status(400).json({
                msg: "error",
                error: "Failed to Create Category",
                data:null
            })
        }
    }
)

//Get product by User
categoryRouter.get("/all-by-user",
    comQValidate("UserId"),
    async (req, res) => {
        const error = validationResult(req);
        const err = resError(error.array());

        if(error.array().length) {
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null,
            })
        }
        const data = matchedData(req);
        console.log(data)
        try {
            const allProduct = await DB.product.findMany({
                select: {
                    Name: true,
                    Price: true,
                    User: {
                        select: {
                            Name: true,
                            Username: true
                        }
                    }
                },
                where: {
                    UserId: Number(data.UserId)
                }
            })
            return res.status(200).json({
                msg: allProduct.length>0?
                        `Products for ${allProduct[0]?.User?.Name}`
                        :"no product for that user",
                error: null,
                data: allProduct,
            })

        }catch(error){
            console.log(error)
            return res.status(500).json({
                msg: 'Failed to update Product',
                error: err,
                data: null,
        })
        }
    }
)

//Update product by ID

categoryRouter.put(
    '/update-category/:id',
    comPValidate('id'),
    comValidate("Name"),
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
        const updatedCategory = await DB.category.update({
            data: {
                Name: data.Name,
            },
            where: {
                Id: Number(id),
            }
        })
        return res.status(200).json({
            msg: 'Category updated successfully',
            error: null,
            data: updatedCategory,
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to update Category',
            data: null,
        })
    }
})

//Delete product by ID
categoryRouter.delete(
    '/delete-category/:id',
    comPValidate('id'),
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
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                msg: 'Category ID is required',
                data: null,
            })
        }

    try{
        const deleteCategory = await DB.category.delete({
            where: {
                Id: Number(id)
            },
            select: {
                Name: true
            }
        })
        return res.status(200).json({
            msg: 'Category deleted successfully',
            error: null,
            data: `${deleteCategory.Name}'s category deleted.`
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed to delete Category',
            data: null,
        })
    }
})

export default categoryRouter;