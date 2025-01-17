const logsets = require("../src/")


async function delay(n = 100) {
	return new Promise((resolve) => setTimeout(resolve, n));
}

const run = async ()=>{
const taskList =[
	{
		title: "开始扫描文件",
		execute: async function () {
			await delay();
		},
	},
	{
		title: "准备对文件进行预处理",
		execute: async function () {
			await delay();
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
	"-",
	{
		title: "任务处理被停止",
		execute: async function () {
			await delay();
		},
	},
	{
		title: "任务执行失败",
		execute: async function () {
			await delay();
			throw new Error("任务执行失败");
		},
	},
	["asdsdsd","asdsdsd"],
	{
		title: "任务待办状态",
		execute: async function () {
			await delay();
		},
	},
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
		},
	},
]
let tasks = logsets.createTasks(taskList,{
	ignoreErrors:true
});

tasks.run("开始执行任务").then(() => {
	console.log("done");
	// logsets.run(["开始执行{}个任务",5],taskList).then(() => {
	// 	console.log("done");
	// });
	
});


}


run()