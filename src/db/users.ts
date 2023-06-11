import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    telphone: { type: Number, required: true },
    decription: { type: String, required: false},
    image_file: { type: String, required: false },
    birthday: { type: Date, required: true },
    gender: { type: Boolean, required: true },
    is_subcribe: { type: Boolean, required: false, default: false},
    authentication: { 
        password: { type: String, required: true },
        salt:  { type: String, select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
