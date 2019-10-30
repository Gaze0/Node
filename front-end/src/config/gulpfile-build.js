const path = require('path');
const {src,dest,series,parallel} = require("gulp");
// const connect = require('gulp-connect');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const cleanCSS = require('gulp-clean-css');

const rev = require('gulp-rev');

const revCollector = require('gulp-rev-collector');

const buildPath = '../../build';

function copyHTML(){
    
    return src([`${buildPath}/rev/**/*.json`, '../*.html'])
    .pipe( revCollector())  
    .pipe(dest(buildPath))
    // .pipe(connect.reload())
}
// revCollector() 将[`${buildPath}/rev/**/*.json`, '../*.html'] 传进去 改html中的css，js

function packSCSS(){
    return src('../styles/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rev()) 
        .pipe(dest(`${buildPath}/styles/`))
        .pipe(rev.manifest())
        .pipe(dest(`${buildPath}/rev/styles/`))
        // .pipe(connect.reload())
}

//rev()生成hash码
//rev.manifest()映射作用

function copylibs(){
    return src('../libs/**/*')
    .pipe(dest(`${buildPath}/libs/`))
}



function packJS(){
    return src('../scripts/app.js')
    .pipe(webpack({//production 压缩
        mode:'production', //development开发
        entry: '../scripts/app.js',//入口
        output:{ //出口
            path:path.resolve(__dirname,buildPath),
            // __dirname 表示当前文件的物理路径
            filename:'app.js'
        },
        module:{
            rules:[
                {
                    test:/\.art$/,
                    loader:'art-template-loader'
                }

            ]
        }
    }))
    .pipe(rev())
    .pipe(dest(`${buildPath}/scripts`))
    .pipe(rev.manifest())
    .pipe(dest(`${buildPath}/rev/scripts`))
    // .pipe(connect.reload())
}

function copyAssets(){
    return src('../assets/**/*')
    .pipe(dest(`${buildPath}/assets`))
}


exports.default = series(parallel(packSCSS,packJS,copylibs,copyAssets),copyHTML);