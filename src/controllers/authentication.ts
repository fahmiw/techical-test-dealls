import express from 'express';
import fs from 'fs';

import { createUser, getUserByEmail } from '../db/users'; 
import { authentication, random, generateAccessToken } from '../helpers';
import { ClientError } from '../exceptions/ClientError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { AuthenticationError } from '../exceptions/AuthenticationError';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if(email && password == undefined) {
            throw new ClientError("The request body incomplete, must fill in the variable email, password");
        }

        const user = await getUserByEmail(email).select('+authentication.salt + +authentication.password');

        if(!user) {
            throw new NotFoundError(`Email ${email} account not found!`)
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash) {
            throw new AuthenticationError("Invalid credentials");
        }

        const sessionToken = generateAccessToken(user.authentication.salt, user._id.toString());
        
        await user.save();

        res.cookie('DATINGAPP-AUTH', sessionToken, { domain: process.env.NODE_ENV === 'production' ? process.env.PROD_HOST : process.env.HOST, path: '/' });

        return res.status(200).json({
            "fullname": user.fullname,
            "email": user.email,
            "sessionToken": sessionToken
        }).end();
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.statusCode).send({
                message: error.message,
            });
        } else {
            console.error(error);
            res.status(500).send({
            message: 'Sorry, have trouble in server'
            });
        }  
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, fullname, telphone, decription, birthday, gender } = req.body;
        
        if (req.file == undefined) {
            throw new ClientError("Please upload a file!");
        }
        //const image_file = req.file.filename;
        const image_file = "req.file.filename";

        if(email && password && telphone && fullname && birthday && gender == undefined) {
            throw new ClientError("The request body incomplete, must fill in the variable email, password, fullname, telphone, birthday, gender");
        }
        const existingUser = await getUserByEmail(email);
        
        if (existingUser) {
            throw new ClientError(`Email ${email} is already register`);
        }

        const salt = random();
        const user = await createUser({
            email, 
            telphone,
            fullname,
            decription,
            birthday,
            gender,
            image_file,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(201).json(user).end();
    } catch (error) {
        // fs.unlink('./public/uploads/' + req.file.filename, (err) => {
        //     if (err) {
        //         throw new ClientError('Failed delete lastest file');
        //     }
        // });
        if (error instanceof ClientError) {
            res.status(error.statusCode).send({
                message: error.message,
            });
        } else if (error.name === "ValidationError") {
            let errors: { [key: string]: any[] } = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        } else {
            console.error(error);
            res.status(500).send({
            message: 'Sorry, have trouble in server'
            });
        }  
    }
}