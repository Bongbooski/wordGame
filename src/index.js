import { getWords } from "./service/wordService";

const div = document.querySelector('.container');
const requiredWord = document.getElementById('requiredWord');
div.innerText = 'Webpack loaded!!';

const clickHandler = ()=>{
    console.log('clicked!')
    getWords();
}

requiredWord.addEventListener('click',clickHandler);