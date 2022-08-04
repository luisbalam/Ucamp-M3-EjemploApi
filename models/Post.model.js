/* Instanciamos mongoose */
const mongoose = require('mongoose');

/* Creamos nuestro Schema */
const PostSchema = new mongoose.Schema(
    {
        visibility: { type: Boolean, default: true },
        user: { type: mongoose.ObjectId, ref: 'User' },
        info: {
            title: { type: String },
            body: { type: String },
            image: { type: String },
        },
        categories: [{ type: mongoose.ObjectId, ref: 'Category' }],
        tags: [
            {
                tagID: { type: String },
                tagName: { type: String },
            }
        ],
    },
    { timestamps: true }
);

mongoose.model('Post', PostSchema, 'collectionPost');