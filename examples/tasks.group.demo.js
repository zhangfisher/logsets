const logsets = require("../src")


async function delay(n = 100) {
	return new Promise((resolve) => setTimeout(resolve, n));
}

const run = async ()=>{
const taskList =[
	"准备阶段",
	{
		title: "开始扫描文件",
		execute: async function () {
			await delay();
			return 'error'
		},
	},
	{
		title: "准备对文件进行预处理",
		execute: async function () {
			await delay();
			return 'skip'
		},
	},
	{
		title: "正在下载文件",
		execute: async function ({task}) {
			await delay();
            for(let i=0;i<100;i++){
                await delay(5)
                task.note(`${i}%`)
            }
		},
	}, 
	"编译项目阶段",
	{
		title: "任务处理被停止",
		execute: async function () {
			await delay();
		},
	},	
	{
		title: "任务处理被停止",
		execute: async function () {
			await delay();
			return 'stop'
		},
	},	
	{
		title: "任务处理被停止",
		execute: async function () {
			await delay();
		},
	},	
	"执行单元测试项目",
	{
		title: "任务执行失败",
		execute: async function () {
			await delay(); 
		},
	},
	{
		title: "任务待办状态",
		execute: async function () {
			await delay();
		},
	},	
	["构建{}项目","vue"],
	{
		title: ["下载文件：{},大小:{}, 已下载{}", "package.json", 122, 344],
		execute: async function () {
			await delay();
		},
	},
	{
		title: ["下载文件：{},大小:{}, 已下载{}", ["package.json", 122, 344]],
		execute: async function () {
			await delay();
			return 'cancel'
		},
		end:true
	},
]
let tasks = logsets.createTasks(taskList,{grouped:true});

tasks.run().then(() => {
	console.log("done");
	logsets.run(["开始执行{}个任务",5],taskList).then(() => {
		console.log("done");
	});
	
});


}


run()