
import clear from 'rollup-plugin-clear'
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel'; 
import  resolve from "@rollup/plugin-node-resolve"
import commonjs from '@rollup/plugin-commonjs';

export default  [
    {
        input:  './index.js', 
        output: [
            {
                file: 'dist/index.mjs', 
                format:"es" 
            },
            {
                file: 'dist/index.js', 
                exports:"default",        
                format:"cjs" 
            }
        ],
        plugins: [
            //resolve(),
            commonjs(),
            babel({
                babelHelpers:"runtime", 
                exclude: 'node_modules/**'
            }),
            clear({targets:["dist"]}),
            uglify()
        ],
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
                file: 'dist/table.plugin.js', 
                exports:"default",    
                format:"cjs" 
            }
        ],
        plugins: [
            //resolve(),
            commonjs(),
            babel({
                babelHelpers:"runtime", 
                exclude: 'node_modules/**',
            }), 
            uglify()
        ],
        external:["@babel/runtime"]
    } 
]