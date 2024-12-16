import express from 'express';
import response from '../Red/response.js';
import { Router } from "express";
const router = Router();

router.get('/', function (req, res) {
    response.success(req, res, 'Okk', 200);
})

export default router;