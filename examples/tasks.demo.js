import logsets from "../src/index.js";

async function delay(n = 100) {
	return new Promise((resolve) => setTimeout(resolve, n));
}
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
                await delay(100)
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
		},
	},
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
let tasks = logsets.createTasks(taskList);

tasks.run().then(() => {
	console.log("done");
	logsets.run(taskList,{title:["开始执行{}个任务",5]}).then(() => {
		console.log("done");
	});
	
});


