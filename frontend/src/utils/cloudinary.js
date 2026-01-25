import axios from "axios"

const cloudinaryConfig={
    preset:'sarthak-ecommerce',
    apiKey:'718886235447362',
    cloudinaryUrl:'https://api.cloudinary.com/v1_1/drnesfqa6/upload'
}

const uploadImage =async (file)=>{
        const formData=new FormData()
        formData.append('file',file)
        formData.append('upload_preset',cloudinaryConfig.preset)
        formData.append('api_key',cloudinaryConfig.apiKey)
    const response=await axios.post(cloudinaryConfig.cloudinaryUrl,formData)
    const imageUrl=response.data.url 
    return imageUrl
}

export default uploadImage