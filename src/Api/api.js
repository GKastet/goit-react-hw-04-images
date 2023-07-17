import axios from "axios";


const urlStart=`https://pixabay.com/api/`

const instance = axios.create({
    baseURL: urlStart,
    params:{
        key: '37603815-98520903b63fc1ffa2ecf35bf',        
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12

    }    

})

export const requestImages = async( pictureName, page = 1)=>{   
    const {data} = await instance.get('/', {params:{
        q: pictureName,
        page,
    }});   
    return data;
}


