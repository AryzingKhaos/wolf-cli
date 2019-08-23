#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const util = require('./util/util');

program.version('1.0.0', '-v, --version')
    //    .command('init <arg>')
       .command('init')
       .action( () => {
            let records = fs.readdirSync('./record');
            let speechs = fs.readdirSync('./speech');
            console.log(records);
            console.log(speechs);
            
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'num',
                    message: '请输入人数'
                },{
                    type: 'input',
                    name: 'recordIndex',
                    message: `请输入想使用的模板的序号，可选模板：\n${records.map((item,index) => `${index}.${chalk.green(item)}`).join('\n')}\n`
                },{
                    type: 'input',
                    name: 'roleIndex',
                    message: `请输入发言模板(输入身份缩写或者序号)，可选：\n${speechs.map((item,index) => `${index}.${chalk.green(item)}`).join('\n')}\n`
                }
            ]).then((answers) => {
                // console.log(answers);
                const spinner = ora('正在构建模板...');
                // if(err){
                //     spinner.fail();
                //     console.log(symbols.error, chalk.red(`获取git@${gitRepo}.git时出错`));
                //     console.log(chalk.red(err));
                // }else{
                    const meta = Object.assign({}, answers);
                    console.log(symbols.success, chalk.green( '你的配置是：'));
                    console.log(chalk.green(JSON.stringify(meta)));

                    // record文件
                    const recordFileName = `./record/${records[meta.recordIndex]}`;
                    const recordExtensionFileName = recordFileName.split('.').reverse()[0];
                    const recordContent = fs.readFileSync(recordFileName).toString();
                    // const result = handlebars.compile(recordContent)(meta);

                    // speech文件
                    roleAbbrNameKVname = {
                        xz:'先知',
                        nw:'女巫',
                    }
                    let role = speechs[meta.roleIndex] ? speechs[meta.roleIndex] : roleAbbrNameKVname[meta.roleIndex.toLowerCase()]
                    const speechFileName = `./speech/${role}.txt`;
                    const speechContent = fs.readFileSync(speechFileName).toString();

                    // 时间
                    let timeName = new Date().format('yyyy-MM-dd HH时mm分');

                    // 开始写入结果
                    const result = [
                        timeName,
                        recordContent,
                        (recordExtensionFileName == 'md' ? '## 发言模板' : '【发言模板】'),
                        speechContent,
                    ].join('\n');
                    fs.writeFileSync(`./wolf/${timeName}-${meta.num}人局.${recordExtensionFileName}`, result);
                    // program.command(`cd project/zt/${year}/${name}`); // 这句代码尝试了一下无效。。
                    spinner.succeed();
                    console.log(symbols.success, chalk.green('项目初始化成功'));
                // }
            })
        });
program.parse(process.argv);











