'use strict';

import stringifyObject from './stringify.js';
import deepmerge from "deepmerge"
import ansicolor from 'ansicolor'
import { isClass,isPlainObject,isAsyncFunction,getDataType, isRegexp,firstUpper } from './utils.js';
import { DefaultOptions } from './consts.js';
  
Object.assign(ansicolor.rgb,{
    bgDarkGray: [13,213,33]
})
 /** 
 'foreground colors'
    .red.green.yellow.blue.magenta.cyan.white.darkGray.black
'light foreground colors'
    .lightRed.lightGreen.lightYellow.lightBlue.lightMagenta.lightCyan.lightGray
'background colors'
    .bgRed.bgGreen.bgYellow.bgBlue.bgMagenta.bgCyan.bgWhite.bgDarkGray.bgBlack
'light background colors'
    .bgLightRed.bgLightGreen.bgLightYellow.bgLightBlue.bgLightMagenta.bgLightCyan.bgLightGray
'styles'
    .bright.dim.italic.underline.inverse // your platform should support italic
 */ 

 

/**
 *   根据red,green,yellow形式的描述字符串返回ansicolor着色函数
 * 
 *   支持允许多种颜色混合使用
 * 
 *   getColorizeFunction("dim,red") === dim(red(...))
 * 
 * @param {*} style 
 * @returns 
 */
export function getColorizeFunction(style){
    let func 
    if(isPlainObject(style)) style = style.style || ""
    try{
        let styles = style.split(",")
        for(let i=0;i<styles.length;i++){
            if(styles[i] in ansicolor){
                if(func){
                    func = func[styles[i]]
                }else{
                    func = ansicolor[styles[i]]
                }
            }
        }
    }catch(e){
        return ansicolor.dim
    }    
    return func || ansicolor.dim
}


function colorizeBaseType(value,opts){
    let options = opts
    if(!options) return value
    if(typeof(options)==="string"){
        options = {style:options,format:null}
    }
    const valueType = getDataType(value);
    // 内容格式化
    if(options.format){
        const formatter =(v)=> typeof(options.format) === "function" ? options.format(v) : 
            (typeof(options.format) === "string" ? options.format.params(v) : v)
        value = formatter(value) 
    }
    const colorize = getColorizeFunction(options.style)
    return colorize(value)
}
 
/**
 * 返回着色后的字符串
 * @param {*} obj 
 * @param {*} opts 
 * @returns 
 */
export default function colorize(obj, opts={}) {   
    let options = deepmerge(DefaultOptions,opts)
    
    const objType = getDataType(obj);    
    if((objType in options) && options[objType] && !isPlainObject(obj) && !Array.isArray(obj)){
        return colorizeBaseType(obj,options[objType]) 
    }  

	return stringifyObject(obj, {
		...options, 
		transform: (obj, key, originalResult) => {  // 获取值类型                
            if(obj == null){
                const valueType = getDataType(originalResult);
                return colorizeBaseType(originalResult,options[objType])
            }else{
                const value = obj[key]; 
                const valueType = getDataType(value);
                if((valueType in options) && options[valueType] && !isPlainObject(value) && !Array.isArray(value)){
                    try{
                        return colorizeBaseType(originalResult,options[valueType]) 
                    }catch{
                        return originalResult;
                    } 
                }  
                return originalResult;
            }
			
		},
	});
} 


