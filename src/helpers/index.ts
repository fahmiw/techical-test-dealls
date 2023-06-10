import crypto from 'crypto';
import multer from 'multer';
import Jwt from 'jsonwebtoken';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.CRYPTO_SECRET).digest('hex');
}

export const storage = (path: any, typename: any) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        cb(null, typename + '-' + uniqueSuffix + file.originalname.slice((file.originalname.lastIndexOf(".") - 2 >>> 0) + 2))
    }
});

export const filter = (req: any, file: any, cb: any) => {
    if( file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export const maxSize = 1000000;

export const generateAccessToken = (salt: any, payload:any) => Jwt.sign({salt, payload}, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_AGE });