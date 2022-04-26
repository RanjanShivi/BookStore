import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

router.post('/post', bookController.postBook);

router.get('/get', bookController.getAllBooks);

export default router;
