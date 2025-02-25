import express from 'express';
import { Router } from "express";
import jwt from 'jsonwebtoken';

import response from '../../Red/response.js';
import controller from './controller.js';

const router = Router();

router.get('/allproducts', async function (req, res) {
    const result = await controller.alldataProducts() //how to recieve table from the function?
    response.success(req, res, result, 200);
})

router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        response.error(req, res, 'InvalidCredentials', 400);
    } else {
        try {
            const result = await controller.login(email, password)
            response.success(req, res, result, 200);
        } catch (error) {
            response.error(req, res, error.message, 400);
        }
    }
})

router.post('/register', async function (req, res) {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        response.error(req, res, 'Invalid', 400);
    } else {
        try {
            const result = await controller.register(name, email, password)
            response.success(req, res, result, 200);uu
        } catch (error) {
            response.error(req, res, error.message, 400);
        }
    }
})

router.post('/logout', async function (req, res) {
    const { token } = req.body;

    if (!token) {
        return response.error(req, res, 'Token is required', 400);
    }
    
    

    try {
        
        revokedTokens.add(token);

        setTimeout(() => revokedTokens.delete(token), 60 * 60 * 1000); 
        response.success(req, res, 'Logout successful', 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
})

export default router;