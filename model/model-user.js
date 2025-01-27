import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { Role } from '../libs/constants';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Guest',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
      password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: {
            values: Object.values(Role),
            message: 'Role is not allowed'
        },
        default: Role.USER,
    },
    token: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: function () {
            return gravatar.url(
                this.email,
                { s: '250' },
                true,
            )
        },
    },
    idAvatarCloud: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema);

export default User;
