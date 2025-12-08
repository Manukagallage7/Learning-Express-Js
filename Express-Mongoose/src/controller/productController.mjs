import { Router } from "express";
import Product from '../model/productModel.mjs';
import User from '../model/userModel.mjs';

const productRouter = Router();

/* -------------------------
   GET ALL PRODUCTS
-------------------------- */
productRouter.get('/all', async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).json({
            message: "Products retrieved successfully",
            status: "Success",
            data: allProducts
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});

/* -------------------------
   CREATE PRODUCT
-------------------------- */
productRouter.post('/create', async (req, res) => {
    const { title, image, user } = req.body;

    try {
        const newProduct = await Product.create({
            title,
            image,
            user
        });

        await User.updateOne(
            { _id: user },
            { $push: { products: newProduct._id } }
        );

        return res.status(201).json({
            message: "Product created successfully",
            status: "Success",
            data: newProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});


/* -------------------------
   UPDATE PRODUCT
-------------------------- */
productRouter.put('/update/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { title, image, user } = req.body;

    try {
        const productData = await Product.findById(productId);

        if (!productData) {
            return res.status(404).json({
                message: "Product not found",
                status: "Failed"
            });
        }

        // Update title & image
        productData.title = title;
        productData.image = image;

        if (user === String(productData.user)) {
            // Same user → only update product
            await productData.save();

            return res.status(200).json({
                message: "Product updated successfully",
                status: "Success",
                data: productData
            });
        }

        // If user changed, update both users
        await User.updateOne(
            { _id: productData.user },
            { $pull: { products: productData._id } }
        );

        await User.updateOne(
            { _id: user },
            { $push: { products: productData._id } }
        );

        // Update product user
        productData.user = user;
        await productData.save();

        return res.status(200).json({
            message: "Product updated and reassigned to new user",
            status: "Success",
            data: productData
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});

productRouter.delete('/delete/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const productData = await Product.findById(productId);

        if (!productData) {
            return res.status(404).json({
                message: "Product not found",
                status: "Failed"
            });
        }

        // Remove product reference from user
        await User.updateOne(
            { _id: productData.user },
            { $pull: { products: productData._id } }
        );

        // Delete product
        await Product.deleteOne({ _id: productId });

        return res.status(200).json({
            message: "Product deleted successfully",
            status: "Success"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
});



export default productRouter;

