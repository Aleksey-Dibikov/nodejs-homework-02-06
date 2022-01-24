import { Router } from "express";
import {
    aggregation,
    repeatEmailForVerifyUser,
    uploadAvatar,
    verifyUser
} from "../../../controllers/users";
import guard from '../../../middlewares/guard';
import { upload } from '../../../middlewares/upload';

const router = new Router()

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:token', verifyUser)
router.post('/verify', repeatEmailForVerifyUser)

export default router;