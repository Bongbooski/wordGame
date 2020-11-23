import { URL } from "../enum/word.enum";
import axios from 'axios';

export const getWords = async ()=>{
    try{
        return await axios.get(URL);
    }catch(error){
        console.log(error)
    }
}
