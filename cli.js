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
        return 'react';
    }

    return args[0];
};

const main = () => {
    const template = getEnv() + '-sample';

    copy_dir($path.resolve(__dirname, 'templates', template), `./${template}`, () => {
        console.log('Invalid template name');
    });
};

main();
