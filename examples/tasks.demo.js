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
		"构建流程",
		{
			title: ["编码读取文件并编译成{}文件","exe"],
		},
		{
			title: "读取文件并编译成exe文件",
		},
		{
			title: "读取文件并编译成exe文件",
		},
		{
			title: "读取文件并编译成exe文件",
		},
		{
			title: "读取文件并编译成exe文件",
		},
		"任务执行",
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
			end:false,
			execute: async function () {
				await delay();
			},
		},
	]
	let tasks = logsets.createTasks(taskList,{
		ignoreErrors:true,
		grouped:true
	});

	tasks.run("开始执行任务").then(() => { 
		// logsets.run(["开始执行{}个任务",5],taskList).then(() => {
		// 	console.log("done");
		// });	
		let fntasks = logsets.createTasks((index,end)=>{
			if(index<taskList.length){
				if(index===taskList.length-1){
					end()
				}
				return taskList[index]
			}else{
				return null
			}
		},{
			ignoreErrors:true
		});
		fntasks.run().then(() => {
			console.log("done");
		});
	},{
		grouped:true
	});


}


run()