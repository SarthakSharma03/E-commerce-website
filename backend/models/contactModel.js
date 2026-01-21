import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
            minlength: 10,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['New', 'Read', 'Replied'],
            default: 'New',
        },
    },
    { timestamps: true }
);

contactSchema.statics.validateUserEmail = async function (email, userId) {
    const user = await mongoose.model('User').findById(userId);
    return user && user.email.toLowerCase() === email.toLowerCase();
};

export const Contact = mongoose.model("Contact", contactSchema);