import colorize, { getColorizeFunction } from './colorize.js'
import {
    getDataType,
    getStringWidth,
    isPlainObject,
    paddingCenter,
    cutstr,
    paddingStart,
    paddingEnd,
    isBaseDataType,
    repeatChars
  } from './utils.js'
import ansicolor from 'ansicolor' 
import deepmerge from 'deepmerge'


const { isEscaped }  = ansicolor



const TableRowType = {
    ROW      : 0,
    SEPARATOR: 1,
    SUMMARY  : 2
}

const DefaultTableOptions  = {
    colorize:1,                                         // 是否需要颜色化 0-禁用着色,1-简单着色 2-对表单元里面的对象和数组进行着色,需要额外的计算
    grid:2,                                             // 是否显示网络线,0-不显示，1-显示垂直线，2-同时显示垂直和水平线
    maxColWidth:32,                                     // 最大列宽,超过会显示省略号
    colPadding:" ",                                     // 列间距
    header:{
        style:"bright"                                  // 表头颜色样式，默认高亮 
    },                                    
    footer:{
        style:"darkGray",                               // 表尾颜色样式                 
        merge:true,                                      // 合并行
        align:"right",                                  // 当合并时对齐方式
    },
    summary:{                                           // 默认汇总行配置
        style:"yellow,bright",                          // 汇总颜色样式
        align:"right",                                  // 汇总对齐方式
    },
    cols:[]                                             // 列定义 = [{align:"center",width:"auto",color:"auto"},...]                 
} 
  
/**
 *  table = createTable()
 *
 *  table.addHeader("<a",">b","c") // <代表左对齐, >代表右对齐, 其他代表居中
 *  table.addRow(1,2,3)
 *  table.addFooter()
 *  table.render()
 * @param {*} options
 */
 function createTable (logOptions,options = {}) {
    const logger = this 
    let tableOptions = deepmerge(DefaultTableOptions,options)
    let headerData, footerData, bodyData = []  
    let totalCols = 1, colStyles = []   // [{width:10,align:'left'},...]
    const colPadding = tableOptions.colPadding || " "
    // 返回表格总宽度，以字符为单元,在formatRow后计算
    function getRowTotalWidth(){
       return colStyles.reduce((preWidth,colStyle)=> preWidth+colStyle.width + tableOptions.colPadding.length ,0) + colStyles.length - 1
    }
    // 填充空白/对齐/截短/多行扩展 , 返回多个行  [[row,..,row],[row],...[row]]
    function formatRow(row, isColorize = true) {
        return expandMultiLineRow(row).map(expanedRow => { 
                expanedRow.cols = expanedRow.cols.map((cell, index) => { 
                    let cellContent
                    let cellDataType = getDataType(cell)
                    let colWidth = colStyles[index].width
                    let curCellWidth = getStringWidth(cell)
                    if (colStyles[index].align === "left") {            // 左对齐
                        cellContent = curCellWidth > colWidth  ? cutstr(cell, colWidth) : paddingEnd(cell, colWidth, ' ')
                    }else if (colStyles[index].align === "right") {     // 右对齐
                        cellContent = curCellWidth > colWidth  ? cutstr(cell, colWidth) : paddingStart(cell, colWidth, ' ')
                    }else {
                        cellContent=  curCellWidth > colWidth  ? cutstr(cell, colWidth) : paddingCenter(cell, colWidth)
                    }
                    // 对基本数据类型进行着色,字符串类型不进行着色
                    if (isColorize && cellDataType!=="String" && tableOptions.colorize) cellContent = getColorizeFunction(logOptions[cellDataType])(cellContent)
                    return `${colPadding}${cellContent}${colPadding}` 
                }) 
            return expanedRow          
        })
    }
    /**
     * 
     * @param {Array} cols    []   单元格数组
     * @param {*} lineStyle   0 = 空, 1 = ├─┼─┼─┼─┤ ， 2 =└─┴─┴─┴─┴─┘ ，3 = ├─┴─┴─┴─┴─┤ ，4 = ┌─┬─┬─┬─┐，5 = ├─┬─┬─┬─┤  ,6 =  ├──────┤ ，7 = └──────┘ ,8 = ────── , 9 = |       |
     * @returns 
     */
    function renderRowGridLine(cols,lineStyle=0) {
        if(lineStyle===0) return
        const { colPadding } = tableOptions
        let resultRow 
        if(lineStyle===1){ // ├─┼─┼─┼─┤
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "├" + repeatChars(getStringWidth(cell) +  colPadding.length,"─") + ((index === cols.length-1) ? '┤' : '┼') 
                }else if(index === cols.length-1){
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┤'
                }else{
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + "┼" 
                }
            })
        }else if(lineStyle===2){ // └─┴─┴─┴─┴─┘ 
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "└" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┘' : '┴') 
                }else if(index === cols.length-1){
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┘'
                }else{
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "┴" 
                }
            })
        }else if(lineStyle===3){ //  ├─┴─┴─┴─┴─┤ 
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "├" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┤' : '┴') 
                }else if(index === cols.length-1){
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┤'
                }else{
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "┴" 
                }
            })
        }else if(lineStyle===4){// ┌─┬─┬─┬─┐
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "┌" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┐' : '┬') 
                }else if(index === cols.length-1){
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┐'
                }else{
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "┬" 
                }
            })
        }else if(lineStyle===5){// ├─┬─┬─┬─┤ 
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "├" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┤' : '┬') 
                }else if(index === cols.length-1){
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┤'
                }else{
                    return   repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "┬" 
                }
            })
        }else if(lineStyle===6){// ├──────┤ 
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "├" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┤' : '─') 
                }else if(index === cols.length-1){
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┤'
                }else{
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "─" 
                }
            })
        }else if(lineStyle===7){// └──────┘ 
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "└" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + ((index===cols.length-1) ? '┘' : '─') 
                }else if(index === cols.length-1){
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┘'
                }else{
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "─" 
                }
            })
        }else if(lineStyle===8){// ──────  
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "─" + repeatChars(getStringWidth(cell)+  colPadding.length,"─") + "─"
                }else if(index === cols.length-1){
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '─'
                }else{
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "─" 
                }
            })
        }else if(lineStyle===9){//  |       |
            resultRow = cols.map((cell,index)=>{ 
                if(index===0){
                    return  "└" + repeatChars(getStringWidth(cell)+colPadding.length,"─") + ((index===cols.length-1) ? '┘' : '─') 
                }else if(index === cols.length-1){
                    return  repeatChars(getStringWidth(cell) +  colPadding.length,"─") + '┘'
                }else{
                    return repeatChars(getStringWidth(cell) +  colPadding.length,"─")  +  "─" 
                }
            })
        }
        console.log(resultRow.join(''))
    }
    
    /**
     *  当表格单元格包含多行文本包含时，需要将整个Row的每一个单元格均扩展为多行，以便能支持多行文本的显示
     * 
     *  例如：{type:0,cols:["a\nb","a"]} 扩展为 {type:0,cols:["a","b"]]}, {type:0,cols:["a",""]} 
     * 
     * @param {*} row 
     * @returns    [{row},...,{row}]
     */
    function expandMultiLineRow (row) {
        // 计算出该扩展的行数
        let expandToRows = row.cols.reduce((preRows, text) =>(typeof text === 'string' ? Math.max(text.split('\n').length, preRows)  : preRows), 1)
        if (expandToRows === 1) return [row]

        //  {type:0,cols:[["a","b"],["a","b"]]}
        row.cols = row.cols.map(cell => {
            let cellRows =typeof(cell) === 'string' ?  cell.split('\n') : [cell]
            if (cellRows.length < expandToRows) { 
                cellRows.push(...new Array(expandToRows - cellRows.length).fill(''))
            }
            return cellRows
        })

        let resultRows = []
        for (let i = 0; i < expandToRows; i++) {
            let newRow = Object.assign({},row)
            newRow.cols = row.cols.map(cell =>cell[i])
            resultRows.push(newRow)
        }
        return resultRows
    }

    /**
     *  绘制表格行
     * 
     *   renderTableRow(header,1,2)
     * 
     * @param {*} eRow    [[row]] 或[[row,row]] 
     */
    function renderTableRow(eRow, tableOptions,cellRender) {
        let { colPadding, grid : gridStyle } = tableOptions
        let rows = [] 
        // │ cell │ cell │ cell │
        let sepLine = gridStyle > 0 ? '│' : ''
        rows.push(...eRow.map(row=>row.cols.map((cell,index)=>{ 
            if(typeof(cellRender)==="function") cell = cellRender(cell)
            return index===0 ? (sepLine+colPadding+ cell + sepLine) : (colPadding+ cell +sepLine)        
        }))) 
        rows.forEach(row=>{console.log(row.join(''))})
    } 
    /**
     * 渲染合并行，合并行内容保存在row.content中
     * @param {*} row 
     * @param {*} tableOptions 
     * @param {*} cellRender 
     */
    function renderTableMergeRow(row, tableOptions,cellRender) {
        let { colPadding, grid : gridStyle } = tableOptions
        let logOptions = this.options
        let tableWidth = getRowTotalWidth() - colPadding.length * 2
        
        let contents = (Array.isArray(row.content) ? row.content.map(item=>this.colorizeString(item)).join("") : row.content).split("\n") 
        let sepLine = gridStyle > 0 ? '│' : '' 
        const align = row.align || 'auto'
        for(let line of contents){
            let lineWidth = getStringWidth(line)  
            if(align==="right"){
                line =  lineWidth > tableWidth  ? cutstr(line, tableWidth) : paddingStart(line, tableWidth) 
            }else if(align==="center"){
                line =  lineWidth > tableWidth  ? cutstr(line, tableWidth) : paddingCenter(line, tableWidth) 
            }else{
                line =  lineWidth > tableWidth  ? cutstr(line, tableWidth) : paddingEnd(line, tableWidth) 
            }      
            if(typeof(cellRender)==="function") line = cellRender(line)      
            console.log(sepLine+ colPadding + line + colPadding + sepLine)
        } 
    }   
    // 对单元格中的对象和数组进行着色
    function colorizeRowCellObject(row) { 
        row.cols = row.cols.map(cell=>{
            if(typeof(cell) === 'string' && !isEscaped(cell)){
                let length = getStringWidth(cell)
                let r = cell.trim()
                if((r.length>5 && r[0]==="{" && r.substr(-1)==="}") || (r.length>3 && r[0]==="[" && r.substr(-1)==="]") ){
                    try{ 
                        cell = colorize(JSON.parse(r),logOptions) 
                        cell = paddingEnd(cell,length)
                    }catch(e){}
                } 
            }
            return cell
        })
        return row
    }
 
    //  返回格式化后的表格（进行宽度计算、截断/补齐/着色等）
    function calcTableLayout () {   
        // 计算头尾的宽度, [width,width,...,width]
        const headerColWidths = headerData ? headerData.cols.map(col=> getStringWidth(col)) : colStyles
        const footerColWidths = (footerData && !footerData.merge) ? footerData.cols.map(col => getStringWidth(col)) : headerColWidths
        // 统一列宽
        headerColWidths.forEach((width, index) => {
            colStyles[index].width = Math.max(          
                width,
                footerColWidths[index],
                colStyles[index].width
            )
            headerColWidths[index] = colStyles[index].width
            footerColWidths[index] = colStyles[index].width
        })
        // 计算表格体单元格的列宽 row={type,cols:[width,width,...,width],...}
        const body = bodyData.map(row => { 
            if(row.type==TableRowType.ROW) {
                row.cols =  row.cols.map((cell, index) => {   
                    cell = isBaseDataType(cell) ? cell :JSON.stringify(cell)    // 所有Object和Array均转化为字符串进行显示 
                    // 取最大列宽           
                    colStyles[index].width = Math.max(          
                        getStringWidth(cell),
                        colStyles[index].width
                    )
                    //  限制单列最大宽度
                    if (colStyles[index].width > tableOptions.maxColWidth ) colStyles[index].width = tableOptions.maxColWidth  
                    headerColWidths[index] = colStyles[index].width
                    footerColWidths[index] = colStyles[index].width
                    return cell
                })  
            }
            return row
        }).map(row=>formatRow(row))
        const footer = footerData ? formatRow(footerData, false)[0] : footerData
        const header = headerData ? formatRow(headerData, false)[0] : headerData
        colStyles.forEach((col,index) => {
            col.width = header ?getStringWidth(header.cols[index]) : (body ? getStringWidth(body[0].cols[index]) : col.width)
        })
        return [header, body, footer]
    }

    // 确保所有行均具有相同的列
    function syncTableSameColumns () {
        if (headerData && headerData.cols.length  < totalCols) headerData.cols.push(...new Array(totalCols - headerData.cols.length).fill(''))
        if (footerData && footerData.cols.length  < totalCols) footerData.cols.push(...new Array(totalCols - footerData.cols.length ).fill(''))
        bodyData.forEach(row => { 
            if(row.cols.length  < totalCols) row.cols.push(...new Array(totalCols - row.cols.length).fill(''))
        })
        if( colStyles.length < totalCols ) colStyles.push(...new Array(totalCols - colStyles.length).fill('').map(r=>({width:0,align:'center'})))
    }
    // 获取下一行的连接线样式，用在grid=2时
    //  0 = 空, 1 = ├─┼─┼─┼─┤ ， 2 =└─┴─┴─┴─┴─┘ ，3 = ├─┴─┴─┴─┴─┤ ，4 = ┌─┬─┬─┬─┐，5 = ├─┬─┬─┬─┤  ，6 = ├──────┤ 
    function getRowLineStyle(body,index){      
        const { grid : gridStyle }= tableOptions 
        const row = body[index][0]   
        if(index == body.length - 1 ){ // 最后一行
            if(gridStyle===0){
                return footerData ? 8 : 0  
            }else{
                return footerData ? (footerData.merge ? (row.merge ? 6 : 3) : (row.merge ? 5 : 1) ) : 2  
            }            
        }else{ // 中间行
            const nextRow = body[index + 1][0]
            if(gridStyle===0){
                return nextRow.merge ? 8 : 0
            }else if(gridStyle===1){
                return nextRow.merge ? (row.merge ? 6 : 3) : (row.merge ? 5 : 0) 
            }else{
                return nextRow.merge ? (row.merge ? 6 : 3) : (row.merge ? 5 : 1) 
            }
        }
    }

    function renderHeader({header, body, footer}={}){
        if(!header) return
        const { grid : gridStyle ,colPadding }= tableOptions 
        let renderFunc = getColorizeFunction(header.style)
        // ┌─┬─┬─┬─┐
        if( gridStyle > 0 ) renderRowGridLine(header.cols,4)
        // | cell | cell | cell |
        renderTableRow([header],tableOptions,renderFunc)        
        if(gridStyle === 0) {
            renderRowGridLine(header.cols,8)
        }else{
            renderRowGridLine(header.cols,body.length > 0 ? 
                (body[0].merge ? 3 : 1) :   // 存在body时，判断body的第一行是否合并行
                (footer ? (footer.merge ? 3 : 1 ) : 2)           // 不存在body时，判断footer是否存在
            ) // └─┴─┴─┴─┴─┘
        }
    }
    function renderFooter({header, body, footer}={}){
        if(!footer) return
        const { grid : gridStyle  }= tableOptions
        let footerRows = []
        let renderFunc = getColorizeFunction(footer.style) 
        if(footer.merge){
            renderTableMergeRow.call(this,footer,tableOptions,renderFunc)
        }else{
            renderTableRow.call(this,[footer],tableOptions,renderFunc)
        }        
        if(gridStyle === 0) {
            renderRowGridLine(9 )
        }else{ 
            //  0 = 空, 1 = ├─┼─┼─┼─┤ ， 2 =└─┴─┴─┴─┴─┘ ，3 = ├─┴─┴─┴─┴─┤ ，4 = ┌─┬─┬─┬─┐，5 = ├─┬─┬─┬─┤  ，6 = ├──────┤  ，7 = └──────┘ 
            renderRowGridLine(footer.cols, footer.merge ? 7 : 2  )
        }
    }
    function renderBody({header, body, footer}={}){
        const { compact,grid:gridType,colorize:colorizeLevel } = tableOptions
        body.forEach((eRow,index) => {          
            const rowType= eRow[0].type
            if(rowType=== TableRowType.SEPARATOR ){
                if(gridType === 0) {
                    renderRowGridLine(eRow[0].cols,8)
                }else if(gridType === 1){
                    if(index!==body.length-1 && index!==0) renderRowGridLine(eRow[0].cols,1)
                }
            }else if(rowType === TableRowType.SUMMARY ){ 
                renderTableMergeRow.call(this,eRow[0],tableOptions,getColorizeFunction(tableOptions.summary.style))
                if(gridType === 0) {
                    renderRowGridLine(eRow[0].cols,8)
                }else{
                    renderRowGridLine(eRow[0].cols,getRowLineStyle(body,index))
                }
            }else{
                // 渲染单元格里面的数组和对象需要额外的处理,默认关闭 {type,cols:[],lineStyle:0}
                if(colorizeLevel === 2) {
                    eRow = eRow.map((row,index)=>colorizeRowCellObject(row))
                }                 
                renderTableRow(eRow,tableOptions)              
                renderRowGridLine(eRow[0].cols,getRowLineStyle(body,index))
            }                                    
          })
    } 

    return {
        /**
        * addRow("a","b","c") 
        * addRow({cols:["a","b","c"]}) 
        */
        addRow () {
            let rowData = {type:0,cols:[]}
            if(arguments.length === 1 && isPlainObject(arguments[0])){
                Object.assign(rowData,arguments[0])
            }else{
                rowData.cols = [...arguments]
            }
            // 总列数
            totalCols = Math.max(totalCols, rowData.cols.length)
            bodyData.push(rowData)
            syncTableSameColumns()
            return this
        }, 
      /**
       * addHeader("a","b","c") 
       * addHeader("a","b",">c")
       * addHeader({cols:["a","b","c"],style:"red"})
       * addHeader({cols:["a","b",{title:"c",format:"{}元"],style:"red"})
       * addHeader({cols:["a","b",{title:"c",format:(value)=>{...}],style:"red"})
       */
      addHeader() {
        headerData = Object.assign({type:0,cols:[]},tableOptions.header)
        if(arguments.length === 1 && isPlainObject(arguments[0])){
            Object.assign(headerData,arguments[0])
        }else{
            headerData.cols = [...arguments]
        }
        // 总列数
        totalCols = Math.max(totalCols, headerData.cols.length)
        // cols规范为{title:"",format:"{}%"} 

        // 计算列宽
        syncTableSameColumns()        
        // 处理列头额外的格式化信息,以>代表右对齐，以<代表左对齐，默认居中
        headerData.cols =  headerData.cols.map((col,index)=>{
            col=String(col)
            if(col.length > 0 && [">","<"].includes(col[0])){
                colStyles[index].align = col[0]===">" ? "right" : "left"
                return col.substr(1)
            }else{
                return col
            }
        })
        return this
      },
      /** 
       * addFooter("a",{})
       * addFooter(["a","b","c"],{merge:false})  
       * addFooter("a",{merge:false}) 
       */      
      addFooter(content,options={}) {
        footerData = Object.assign({type:0,merge:true,cols:[],content:"",align:"right"},tableOptions.footer,options)
        if(footerData.merge){ 
            footerData.content = content
        }else{
            footerData.cols = Array.isArray(content) ? content : [content]
        }
        totalCols = Math.max(totalCols,footerData.merge ? 0 :  footerData.cols.length-1)
        syncTableSameColumns()
        return this
      },
      addSeparator() {
        bodyData.push({type:TableRowType.SEPARATOR,cols:[]})
        syncTableSameColumns()
        return this
      }, 
      addSummary(content,options={}){
        bodyData.push({type:TableRowType.SUMMARY,cols:[],content,...options,merge:true})
        syncTableSameColumns()
        return this
      },
      render () {
        const [header, body, footer] = calcTableLayout()
        if(header) renderHeader.call(logger,{header, body, footer})
        renderBody.call(logger,{header, body, footer})
        if(footer) renderFooter.call(logger,{header, body, footer})
      }
    }
}
  
/**
 * 
 * @param {*} logger      日志实例对象，可以调用logger.log()等方法
 * @param {*} context     全局配置参数
 */
export default function(logger,context){
    logger.table = (opts={})=>createTable.call(logger,context,opts)
}