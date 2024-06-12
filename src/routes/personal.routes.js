import { Router } from 'express';
import { 
    login,
    getInspectorById
} from '../controllers/personal.controller.js';

const router = Router();

router.post('/login',login);

router.get('/:legajo',getInspectorById);

export default router;