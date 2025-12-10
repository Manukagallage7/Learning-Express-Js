import { Router } from "express";
import Category from '../model/categoryModel.mjs';
import Product from '../model/productModel.mjs';

const categoryRouter = Router();

//create category

categoryRouter.post('/', async (req, res) => {
    const {title} = req.body;

    try{
        const newCategory = await Category.create({ title })

        return res.status(201).json({
            message: "Category created successfully",
            status: "Success",
            data: newCategory
        })

    } catch(err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

//Get all categories

categoryRouter.get('/all', async (req, res) => {
    try{
        const allCategories = await Category.find().populate('products');

        return res.status(200).json({
            message: "Categories retrieved successfully",
            status: "Success",
            data: allCategories
        })

    }catch(err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

//Get category by ID
categoryRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const category = await Category.findById(id);
        
        return res.status(200).json({
            message: "Category retrieved successfully",
            status: "Success",
            data: category
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

//Update Category

categoryRouter.put('/update/:id', async (req, res) => {
    const categoryId = req.params.id;
    const productId = req.query.product;

    try {
        if (!categoryId || !productId) {
            return res.status(404).json({
                message: "Not found",
                status: "Failed"
            });
        }
        await Category.updateOne(
            { _id: categoryId },
            { $push: { products: productId } }
        );
        await Product.updateOne(
            { _id: productId },
            { $push: { category: categoryId } }
        );

        return res.status(200).json({
            message: "Category updated successfully",
            status: "Success"
        });
        
        /*
        const categoryData = await Category.findById(categoryId);
        const productData = await Product.findById(productId);

        categoryData.products.push(productId);
        productData.category.push(categoryId);

        const updatedCategory = await categoryData.save();
        await productData.save();
        */
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});

//Delete Category(For Category to product relation delete only)

categoryRouter.delete('product-delete/:id', async (req, res) => {
    const productId = req.query.product;

    try {
        if (!productId ) {
            return res.status(404).json({
                message: "ID Not found",
                status: "Failed"
            });
        }

        await Category.updateMany(
            {products: productId},
            {$pull: {productId}}
        )

        await Product.updateOne(
            {_id: productId},
            {$pull: {products: []}}
        )

        return res.status(200).json({
            message: "Category deleted successfully",
            status: "Success"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});

export default categoryRouter;