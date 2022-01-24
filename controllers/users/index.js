/* eslint-disable no-unused-vars */
import { HttpCode } from "../../libs/constants"
import {
    UploadFileService,
    LocalFileService,
    CloudFileService
} from '../../service/file-storage'

const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileService(
        CloudFileService,
        req.file,
        req.user,
    )
    const avatarUrl = await uploadService.updateAvatar()
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
}

export { uploadAvatar }