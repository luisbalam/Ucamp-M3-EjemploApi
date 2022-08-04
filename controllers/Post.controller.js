const mongoose = require('mongoose'),
    Post = mongoose.model('Post');

const createPost = async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            //! NOTA: Obtenemos el user ID del token!!!
            user: req.user.idUser
        });

        // const resp = await (await post.save()).populate('category');

        const resp = await post.save();

        return res.json({
            menssage: 'Post created successfully',
            detail: await resp.populate('categories'),
        });
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const resp = await Post.find().populate('categories').populate('user');

        if (resp.length === 0) {
            return res.status(404).json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'Posts',
                detail: resp
            })
        }
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const filterCategory = async (req, res) => {
    try {
        const resp = await Post.find({ categories: req.params.category }).populate('categories').populate('user');

        if (resp.length === 0) {
            return res.status(404).json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'Posts',
                detail: resp
            })
        }
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const filterTagID = async (req, res) => {
    try {
        const resp = await Post.find({ "tags.tagID": req.params.tagId }).populate('categories').populate('user');

        if (resp.length === 0) {
            return res.status(404).json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'Posts',
                detail: resp
            })
        }
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const addCategory = async (req, res) => {
    try {
        /* const resp = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push:{
                    tags:{
                        "tagID": "5",
                        "tagName": "nuevo",
                    }
                }
            }
        ).populate('categories').populate('user'); */

        const resp = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                "tags._id": "61e3268ecd5e0e91553c5aee"
            },

            {
                $set: {
                    "tags.$.tagName": "hola!!!",
                }
            }
        ).populate('categories').populate('user');


        if (resp.length === 0) {
            return res.status(404).json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'Posts',
                detail: resp
            })
        }
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const getPublicPosts = async (req, res) => {
    try {
        const resp = await Post.find({ visibility: true }).populate('category');
        // Si no encuentra nada, resp = null
        // Si encuentra al menos 1, resp = [registros]
        if (resp.length == 0) {
            return res.status(404).json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        }
        return res.status(200).json({
            menssage: 'Posts',
            detail: resp,
        })
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const getMyPosts = async (req, res) => {
    try {
        const resp = await Post.find({ user: req.user.idUser }).populate('category');
        // Si no encuentra nada, resp = null
        // Si encuentra al menos 1, resp = [registros]
        if (resp.length == 0) {
            return res.json({
                menssage: 'Sin registros',
                detail: []
            })
        }
        return res.json({
            menssage: 'Posts',
            detail: resp,
        })
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const newData = req.body;

        const resp = await Post.findByIdAndUpdate(
            newData.postId,
            { $set: newData },
            { new: true }
        )

        return res.json({
            menssage: 'Post updated successfully',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const resp = await Post.findByIdAndDelete(req.params.id)

        return res.json({
            menssage: 'Post deleted successfully',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

/* 
    Mostrar listado de posts públicos
    Mostrar listado de los posts del usuario logueado
    Editar y eliminar posts
 */

module.exports = {
    createPost,
    getPosts,
    getPublicPosts,
    getMyPosts,
    filterCategory,
    filterTagID,
    addCategory
}
