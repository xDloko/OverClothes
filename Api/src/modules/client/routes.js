import express from 'express';
import { Router } from "express";

import response from '../../Red/response.js';
import controller from './controller.js';

const router = Router();

router.get('/', async function (req, res) {
    const result = await controller.alldataProducts()
    response.success(req, res, result, 200);
})

export default router;