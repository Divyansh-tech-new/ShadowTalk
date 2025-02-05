import mongoose from 'mongoose';
import pkg from 'bcryptjs';
const { genSalt, hash, compare } = pkg;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await compare(candidatePassword, this.password);
};

const User = mongoose.model('Users', userSchema);

export default User;

