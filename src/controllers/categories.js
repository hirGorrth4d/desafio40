const {CategoryApi} = require('../api/categories');

const getAllCategories = async (req,res) => {
    const categories = await CategoryApi.find();
    res.json(categories);
}

const getCategoryById = async (req,res) => {
    const {id } = req.params;
    const category = await CategoryApi.find(id);
    if (!category) {
        return res.status(400).json({msg: 'Categoria no encontrada'})
    }
    res.json({
        data: category
    })
}
const createCategory = async (req,res) => {
    const { name, description} = req.body;
    if(!name || !description) {
        return res.status(400).json({msg: 'Datos invalidos'})
    }
    const newCategory = {
        name,
        description,
    }
    const category = await CategoryApi.create(newCategory)

    res.json({
        msg: 'categoria creada',
        data: category,
    })
}


const updateCategory = async (req,res) => {
    const {id} = req.params;
    const {name,description} =req.body;

    if (!name && !description) {
        return res.status(400).json({msg: 'datos invalidos'});
    }

    const newData = {
        name, description
    }
    const categoryUpdated = await CategoryApi.update(id, newData);

    res.json({
        msg: 'datos actualizados',
        data: categoryUpdated
    })
}
const deleteCategory = async (req,res) => {
    const {id } = req.params;
    const category = await CategoryApi.find(id);
    if(!category) return res.status(400).json({msg: 'Categoria no encontrada'});

    await CategoryApi.remove(id);

    res.json({
        msg: 'Categoria borrada'
    })
}

module.exports  = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}