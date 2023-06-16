import ansicolor  from "ansicolor";
const { isEscaped,strip } = ansicolor
import { isPlainObject,isAsyncFunction} from 'flex-tools';

export function isClass(cls){
    let result = false
    if (typeof(cls) === 'function' && cls.prototype) {
        try {
            cls.arguments && cls.caller;
        } catch(e) {
            result=true
        }
    }
    return result;
}
export function isClassInstance(obj){
    return obj.constructor && obj.constructor.toString().startsWith("class") 
}
 

// 获取所有给定对象所有自有的Symbol值的可枚举属性的数组
export function getOwnEnumPropSymbols(obj){
	return Object
    .getOwnPropertySymbols(obj)
    .filter((keySymbol) => Object.prototype.propertyIsEnumerable.call(obj, keySymbol));
}
 
/**
 * 当参数大于2个，并且最后一个参数是一个{}时，视为控制配置参数
 * 
 * consoleOutput(1,{
 *    append:" ",            // 默认每一个参数后面添加的字符串，默认空格 
 *    end: "\n"              // 结束字符
 * })
 * 
 * @param  {...any} texts 
 */
export function consoleOutput(...texts){
    let options = {
        append:" ",
        end:"\n"  //换行符
    }
    if(texts.length>=2 && isPlainObject(texts[texts.length-1])){
        Object.assign(options,texts.pop())
    }
    texts.forEach(text=>{
        process.stdout.write(text+options.append)
    }) 
    if(options.end){
        process.stdout.write(options.end) 
    }
}
export function newline(){
    process.stdout.write("\n") 
}
export function hideCursor(){
    process.stdout.write(`${"\x1b"}[?25l`) 
}
export function showCursor(){
    process.stdout.write(`${"\x1b"}[?25h`) 
}

/**
 *  字符串居中填充
 *  paddingCenter("a",5,"*")  == "**a**"
 * 
 * @param {*} s 
 * @param {*} width 
 * @param {*} fillChar 
 * @returns 
 */
export function paddingCenter(s,width,fillChar=" ") { 
    let len = getStringWidth(String(s))
    let llength=parseInt((width-len)/2)
   // if(llength<=0) return 
    try{
        return new Array(llength).fill(fillChar).join("")+s+new Array(width-len-llength).fill(fillChar).join("")
    }catch(e){
        return s
    }    
} 
export function paddingStart(s,width,fillChar=" ") { 
    let len = getStringWidth(String(s)) 
   // if(len>=width) return s 
    try{
        return new Array(width-len).fill(fillChar).join("")  + s 
    }catch(e){
        return s
    }
   
}  
export function paddingEnd(s,width,fillChar=" ") { 
    let len = getStringWidth(String(s)) 
   // if(len>=width) return s 
   try{
        return s + new Array(width-len).fill(fillChar).join("")
   }catch{
        return s
   }    
} 
// 获取左边连续的字符串
export function getLeftRepeatChars(s,char=" "){
    let r = []
    for(let i=0;i<=s.length;i++){
        if(s[i]!==char) break
        r.push(char)
    } 
    return r.join("")
}
export function getRightRepeatChars(s,char=" "){
    let r = []
    for(let i=s.length-1;i>=0;i--){
        if(s[i]!==char) break
        r.push(char)
    } 
    return r.join("")
}

export function repeatChars(count,char){
    return new Array(count).fill(char).join("")
}

function getSignalLineWidth(s){
    let str = String(s)
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;  
} 

// 获取字符串长度，中文按2个字符表示，多行字符串取其中最长的一行
// 如果是着色过的会自动去掉着色再计算
export function getStringWidth(str){  
    if(isPlainObject(str) || Array.isArray(str)) str = JSON.stringify(str)
    if(typeof(str)!=="string") str = String(str)
    if(isEscaped(str)) str = strip(str)
    return Math.max(...String(str).split("\n").map(s=>getSignalLineWidth(s))    )
} 

// 返回指定内空是否是基本的数据类型
export function isBaseDataType(value){
    return !(Array.isArray(value) || isPlainObject(value))
}
 
// 截取字符串，超过显示省略号，支持中文
export function cutstr(str, len) {
    if(getStringWidth(str)<=len) return str
    if(len<4) len = 4 
    var str_length = 0;
    var str_len = 0;
    let str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        let a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {            
            str_length++;//中文字符的长度经编码之后大于4  
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len-3) {
            str_cut = str_cut.concat("...");
            if(getSignalLineWidth(str_cut)>len) str_cut = str_cut.substr(0,str_cut.length-1)
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    } 
}
/**
 * 截断字符串
 * truncateString("123456789",3,"*") == "123*456*789"
 * truncateString("123456789",3) == 第一行："123 第二行：456 第三行：*789
 * @param {*} s 
 * @param {*} width 
 * @param {*} fillChar 
 */
export function truncateString(s,width=80,fillChar="\n"){
    if(s.length<=width) return s
    let lines=[] , index = 0
    while(index<s.length){
        lines.push(s.substr(index,width))
        index+=width
    } 
    return lines.join(fillChar)
}
 
export function getDataType(v){
	if (v === null)  return 'Null' 
	if (v === undefined) return 'Undefined'  
    if(isClass(v)) return 'Class'
    if(isClassInstance(v)) return 'Instance'
    if(isAsyncFunction(v)) return "AsyncFunction"
    if(typeof(v)==="function")  return "Function"
	return v.constructor && v.constructor.name;
};
 
export function isPlainFunction(obj){
    return typeof obj === 'function' && !isClass(obj)
}
 
export function isRegexp(value) {
	return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 对text里面的插值内容进行处理
 * 
 * colorizeVars
 * 
 * @param {*} text 
 * @param {Function(word,match)} callback
 */
export function forEachInterpolateVars(text,callback){
    if(!(text.includes("{") && text.includes("}"))) return text
    if(typeof(text) === 'string'){
        return text.replace(/\{\s?(.*?)\s?\}/gm,(match,word)=>{
            if(typeof(callback)=="function"){
                return callback(word,match)
            }else{
                return word    
            } 
        })
    }else{
        return text
    }    
}
 