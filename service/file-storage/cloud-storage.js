import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util'
import { unlink } from 'fs/promises'
import Users from '../../repository/repository-users'
import { CLOUD_FOLDER_AVATARS } from '../../libs/constants'

cloudinary.config({ 
  cloud_name: process.env.Cloud_Name, 
  api_key: process.env.API_Key, 
  api_secret: process.env.API_Secret,
  secure: true
})
class CloudStorage {
    constructor(file, user) {
        this.userId = user.id
        this.filePath = file.path
        this.idAvatarCloud = user.idAvatarCloud
        this.folderAvatars = CLOUD_FOLDER_AVATARS
        this.uploadCloud = promisify(cloudinary.uploader.upload)
    }

    async save() {
        const { public_id: idAvatarCloud, secure_url: avatarUrl } = await this
            .uploadCloud(this.filePath, {
                public_id: this.idAvatarCloud,
                folder: this.folderAvatars,
            })
        
        const newIdAvatarCloud = idAvatarCloud
            .replace(`${this.folderAvatars}/`, '')
        
        await Users.updateAvatar(this.userId, avatarUrl, newIdAvatarCloud)
        await this.removeUploadFile(this.filePath)
        return avatarUrl
    }
    
    async removeUploadFile(filePath) {
        try {
            await unlink(filePath)
        } catch (error) {
            console.error(error.message)
        }
    }
}

export default CloudStorage;