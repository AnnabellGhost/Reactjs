/*Created by Zhang Xingping on 20170508*/
import * as ErrorMessages from './errorMessages.js';

export const required=(text)=> text?'':ErrorMessages.isRequired; 
export const lengthMustBe=(length)=>{
    return (text)=>{      
        return text.length===length?'': ErrorMessages.lengthMustBe(length);
    }
}
export const beginWithDecimal=(text)=>text.toString().slice(0,1)!=='.'?'': ErrorMessages.beginWithDecimal;
export const notZero=(num)=>Number(num.toString().trim())!==0?'':ErrorMessages.notZero;
export const lengthMaximum=(length)=>{
    return (text)=>{
        return text.length<=length?'':ErrorMessages.lengthMaximum(length);
    }
}