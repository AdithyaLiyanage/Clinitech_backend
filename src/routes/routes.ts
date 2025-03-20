import { Router } from 'express';
import { searchPatient, addBillController } from '../controllers/billController';

const router = Router();

router.get('/patient/:id', searchPatient);
router.post('/bill', addBillController);

export default router;
