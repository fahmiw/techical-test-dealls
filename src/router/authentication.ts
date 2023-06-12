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
    
    router.post('/auth/signup', upload.single('image_file'), register);
    router.post('/auth/login', login);
};