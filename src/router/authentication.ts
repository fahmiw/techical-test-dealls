import express from 'express';
import multer from 'multer';

import { register, login } from '../controllers/authentication';
import { storage, filter, maxSize } from '../helpers/index';

export default (router: express.Router) => {
    const upload = multer({ 
        storage: storage('./public/uploads', 'profile'),
        fileFilter: filter,
        limits: { fileSize: maxSize }
    });
    //upload.single('image_file'),
    router.post('/auth/signup', register);
    router.post('/auth/login', login);
};