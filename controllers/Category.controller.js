const mongoose = require('mongoose'),
    Category = mongoose.model('Category');

const createCategory = async (req, res) => {
    try {
        const post = new Category(req.body);

        const resp = await post.save();

        return res.json({
            menssage: 'Category created successfully',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const resp = await Category.find();

        if (resp.length === 0) {
            return res.json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'Categories',
                detail: resp
            })
        }
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e
        })
    }
}

module.exports = {
    createCategory,
    getCategories
}
