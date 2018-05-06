#!/usr/bin/env node
const $fs = require( 'fs' );
const $path = require('path');

const copy_dir = (src, dist, callback) => {
    $fs.access(dist, err => {
        if(err) {
            // 目录不存在时创建目录
            $fs.mkdirSync(dist);
        }

        $fs.readdir(src, (err, paths) => {
            if(err){
                callback(err)
                return;
            }

            paths.forEach(path => {
                const _src = $path.resolve(src, path);
                const _dist = $path.resolve(dist, path);

                $fs.stat(_src, (err, stat) => {
                    if(err){
                        callback(err);
                        return;
                    }

                    if(stat.isFile()) {
                        $fs.writeFileSync(_dist, $fs.readFileSync(_src));
                    } else if(stat.isDirectory()) {
                        copy_dir(_src, _dist, callback)
                    }
                });
            });
        });
    });
};


const getEnv = () => {
    const args = process.argv.slice(2);

    if (!args.length) {
        return 'react-simple';
    }

    return args[0];
};

const main = () => {
    switch(getEnv()) {
        case 'react-simple':
            copy_dir($path.resolve(__dirname, 'react-simple'), './react-simple');
            console.log('enjoy it!'); break;
        case 'react-electron':
            copy_dir($path.resolve(__dirname, 'react-electron'), './react-electron');
            console.log('enjoy it!'); break;
        default:
            console.log('invalid template name');
    }
};

main();
