
import clear from 'rollup-plugin-clear'
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel'; 
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

// import  resolve from "@rollup/plugin-node-resolve"

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
        plugins: [
            //resolve(),
            commonjs(),
            babel({
                babelHelpers:"runtime", 
                exclude: 'node_modules/**'
            }),
            clear({targets:["dist"]}),
            terser()
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
                file: 'dist/table.plugin.cjs', 
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
            terser()
        ],
        external:["@babel/runtime"]
    } 
]