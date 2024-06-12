import { isRegexp,getOwnEnumPropSymbols} from "./utils.js"  
import { isPlainObject } from 'flex-tools/typecheck/isPlainObject';

/**
 * 获取对象的键名对齐的长度
 */
function getObjectKeysMaxLength(keys){ 
    return keys.reduce((preLen,key)=>{
        return Math.max(preLen,key.length);
    },0)
}


export default function stringifyObject(input, options, pad) {
	const seen = [];

	return (function stringify(input, options = {}, pad = '') {
		const indent = options.indent || '\t';

		let tokens;
		if (options.inlineCharacterLimit === undefined) {
			tokens = {
				newline: '\n',
				newlineOrSpace: '\n',
				pad,
				indent: pad + indent,
			};
		} else {
			tokens = {
				newline: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
				newlineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
				pad: '@@__STRINGIFY_OBJECT_PAD__@@',
				indent: '@@__STRINGIFY_OBJECT_INDENT__@@',
			};
		}

		const expandWhiteSpace = string => {
			if (options.inlineCharacterLimit === undefined) {
				return string;
			}

			const oneLined = string
				.replace(new RegExp(tokens.newline, 'g'), '')
				.replace(new RegExp(tokens.newlineOrSpace, 'g'), ' ')
				.replace(new RegExp(tokens.pad + '|' + tokens.indent, 'g'), '');

			if (oneLined.length <= options.inlineCharacterLimit) {
				return oneLined;
			}

			return string
				.replace(new RegExp(tokens.newline + '|' + tokens.newlineOrSpace, 'g'), '\n')
				.replace(new RegExp(tokens.pad, 'g'), pad)
				.replace(new RegExp(tokens.indent, 'g'), pad + indent);
		};

		if (seen.includes(input)) {
			return '"[Circular]"';
		}

		if (
			input === null
			|| input === undefined
			|| typeof input === 'number'
			|| typeof input === 'boolean'
			|| typeof input === 'symbol' 
		) {
			return String(input);
		}else if(isRegexp(input)){
            return  options.transform(null, null , input)
        }else if(typeof input === 'function'){
            return options.transform(null, null , input)
        }

		if (Array.isArray(input)) {
			if (input.length === 0) {
				return '[]';
			}
			seen.push(input);
            let returnValue
            let addOverflowTag = options.Array.maxItems>0 &&  input.length > options.Array.maxItems
            if(options.Array.compact===true || (options.compact===true && options.Array.compact!==false)){
                returnValue = '[ '+ input.map((element, i) => {    
                    if(addOverflowTag && i===options.Array.maxItems){
                        return "...";
                    }else if(i>options.Array.maxItems){
                        return "" 
                    }
                    const eol = input.length - 1 === i ? "" : ', ' 
                    let value = stringify(element, options, pad );
                    if (options.transform) {
                        value = options.transform(input, i, value);
                    }    
                    return   value + eol;
                }).join('') + ' ]'; 
            }else{
                returnValue = '[' + tokens.newline + input.map((element, i) => {
                    let eol = input.length - 1 === i ? tokens.newline : ',' + tokens.newlineOrSpace;
                    
                    if(addOverflowTag && i===options.Array.maxItems){
                        return tokens.indent + "..."+ tokens.newline
                    }else if(i>options.Array.maxItems){
                        return ""
                    }
                    
                    let value = stringify(element, options, pad + indent);
                    if (options.transform) {
                        value = options.transform(input, i, value);
                    }                    
                    return tokens.indent + value + eol;
                }).join('') + tokens.pad + ']';   
            } 
            if(addOverflowTag && typeof(options.Array.memo)==="function"){
                returnValue+=options.Array.memo(input)
            }
			seen.pop();

			return expandWhiteSpace(returnValue);
		}

		if (isPlainObject(input)) {
			let objectKeys = [
				...Object.keys(input),
				...getOwnEnumPropSymbols(input),
			];

			if (options.filter) {
				// eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
				objectKeys = objectKeys.filter(element => options.filter(input, element));
			}

			if (objectKeys.length === 0) {
				return '{}';
			}

			seen.push(input);
            let returnValue
            let addOverflowTag = options.Object.maxItems>0 &&  objectKeys.length > options.Object.maxItems
            if(options.Object.compact===true || (options.compact===true && options.Object.compact!==false)){
                returnValue = '{' + objectKeys.map((element, i) => {
                    if(addOverflowTag && i===options.Object.maxItems){
                        return  "..." 
                    }else if(i>options.Object.maxItems){
                        return "" 
                    }
                    const eol = objectKeys.length - 1 === i ? " " : ', ' ;
                    const isSymbol = typeof element === 'symbol';
                    const isClassic = !isSymbol && /^[a-z$_][$\w]*$/i.test(element);
                    const key = isSymbol || isClassic ? element : stringify(element, options);

                    let value = stringify(input[element], options, pad );
                    if (options.transform) {
                        value = options.transform(input, element, value);
                    }
                    return String(key) + ': ' + value + eol;
                }).join('')  + '}';
            }else{
                let keyPadding = getObjectKeysMaxLength(objectKeys)+2
                returnValue = '{' + tokens.newline + objectKeys.map((element, i) => {
                    const eol = objectKeys.length - 1 === i ? tokens.newline : ',' + tokens.newlineOrSpace;
                    
                    if(addOverflowTag && i===options.Object.maxItems){
                        return tokens.indent + "..." + tokens.newline
                    }else if(i>options.Object.maxItems){
                        return "" 
                    }
                    const isSymbol = typeof element === 'symbol';
                    const isClassic = !isSymbol && /^[a-z$_][$\w]*$/i.test(element);
                    const key =String(isSymbol || isClassic ? element : stringify(element, options))

                    let value = stringify(input[element], options, pad + indent);
                    if (options.transform) {
                        value = options.transform(input, element, value);
                    }
                    // 对齐填充
                    try{
                        const itemPadding =options.Object.align ? new Array(keyPadding - key.length).fill(" ").join("") : ""
                        return tokens.indent + key + itemPadding + ' : ' + value + eol;

                    }catch(e){
                        console.log(e)
                    }
                }).join('') + tokens.pad + '}';                
            } 
            if(addOverflowTag && typeof(options.Array.memo)==="function"){
                returnValue+=options.Object.memo(objectKeys)
            }
			seen.pop();

			return expandWhiteSpace(returnValue);
		}

		input = String(input).replace(/[\r\n]/g, x => x === '\n' ? '\\n' : '\\r');

		if (options.singleQuotes === false) {
			input = input.replace(/"/g, '\\"');
			return `"${input}"`;
		}

		input = input.replace(/\\?'/g, '\\\'');
		return `'${input}'`;
	})(input, options, pad);
}
