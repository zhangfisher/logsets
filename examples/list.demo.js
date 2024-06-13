

const logsets = require("../src/")



logsets.list(["欢迎使用{}国际化解决方案",'VoerkaI18n'], [
    {
		title: "全流程支持",
		description:"从文本提取/自动翻译/编译/动态切换的全流程工程化支持，适用于大型项目",
	},
	{
		title: "集成自动翻译",
        type:"×",
		description:["调用{}支持对提取的文本进行自动翻译，大幅度提高\n工程效率","在线翻译API"],
	},
	{
		title: "符合直觉",
        type:['○','yellow'],
        style:"red",
		description:"在源码中直接使用符合直觉的翻译形式，不需要绞尽脑汁想种种key",
	},
	{
		title: ["支持{}","TypeScript"],
		description: "内置支持TypeScript类型以及生成TypeScript源码",
	},
	{
		title: "自动提取文本",        
		description: "提供扫描提取工具对源码文件中需要翻译的文本进行提取",
	},
	{
		title: "适用性",
		description:
			"支持任意Javascript应用,包括Nodejs/Vue/React/ReactNative等。",
	},
	{
        title: "多库联动", description: "支持多包工程下多库进行语言切换的联动" 
	},
	"工具链:提供Vue/React/Babel等扩展插件，简化各种应用开发",
	{
		title: "插值变量",
		indent:"-------",
		description:
			"强大的插值变量机制，能扩展支持复数、日期、货币等灵活强大的多语言特性",
	},
	{ title: "语言补丁", description: "在应用上线后发现错误时可以在线修复" },
	{ title: "动态增加语种", description: "可以在应用上线后动态增加语种支持" },
	{ title: ["测试覆盖率{}","90%+"], description: "核心运行时超过90%的测试覆盖率" }
],{
    showOrderNumber:false
})