import mongoose from 'mongoose';

// Define the schema for a government scheme
const schemeSchema = new mongoose.Schema({
    schemeName: {
        type: String,
        required: [true, 'Scheme name is required'],
        minLength: [3, 'Scheme name must be at least 3 characters long'],
        maxLength: [100, 'Scheme name cannot exceed 100 characters'],
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        minLength: [10, 'Short description must be at least 10 characters long'],
        maxLength: [300, 'Short description cannot exceed 300 characters'],
    },
    fullDescription: {
        type: String,
        required: [true, 'Full description is required'],
        minLength: [50, 'Full description must be at least 50 characters long'],
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: 'Please provide a valid URL!',
        },
    },
    categories: {
        type: [String],  // Categories the scheme belongs to (e.g., 'education', 'health', etc.)
        required: false,  // Optional
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Timestamp when the scheme was created
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Timestamp when the scheme was last updated
    },
});

// Create a model for the government scheme
const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
