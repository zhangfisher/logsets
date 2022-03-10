
import clear from 'rollup-plugin-clear' 
import { babel } from '@rollup/plugin-babel'; 
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

// import  resolve from "@rollup/plugin-node-resolve"
const plugins =  [
    //resolve(),
    commonjs(),
    babel({
        babelHelpers:"runtime", 
        exclude: 'node_modules/**'
    }),
    clear({targets:["dist"]}),
    terser()
]
export default  [
    {
        input:  './index.js', 
        output: [
            {
                file: 'dist/index.mjs', 
                format:"es" 
            },
            {
                file: 'dist/index.cjs', 
                exports:"default",        
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    },
    {
        input:  './table.plugin.js', 
        output: [
            {
                file: 'dist/table.plugin.mjs', 
                format:"es" 
            },
            {
                file: 'dist/table.plugin.cjs', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    },
    {
        input:  './progressbar.plugin.js', 
        output: [
            {
                file: 'dist/progressbar.plugin.mjs', 
                format:"es" 
            },
            {
                file: 'dist/progressbar.plugin.cjs', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    },
    {
        input:  './tasklist.plugin.js', 
        output: [
            {
                file: 'dist/tasklist.plugin.mjs', 
                format:"es" 
            },
            {
                file: 'dist/tasklist.plugin.cjs', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    },
    {
        input:  './banner.plugin.js', 
        output: [
            {
                file: 'dist/banner.plugin.mjs', 
                format:"es" 
            },
            {
                file: 'dist/banner.plugin.cjs', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    },
    {
        input:  './tree.plugin.js', 
        output: [
            {
                file: 'dist/tree.plugin.mjs', 
                format:"es" 
            },
            {
                file: 'dist/tree.plugin.cjs', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins,
        external:["@babel/runtime"]
    }  
]