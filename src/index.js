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
       .command('init <arg>')
       .action( (arg) => {
            let templates = fs.readdirSync('./template');
            console.log(templates);
            
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'num',
                    message: '请输入人数'
                },{
                    type: 'input',
                    name: 'templateIndex',
                    message: `请输入想使用的模板的序号，可选模板：\n${templates.map((item,index) => `${index}.${chalk.green(item)}`).join('\n')}\n`
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
                    const fileName = `./template/${templates[meta.templateIndex]}`;
                    const extensionFileName = fileName.split('.').reverse()[0];
                    const content = fs.readFileSync(fileName).toString();
                    // const result = handlebars.compile(content)(meta);
                    let timeName = new Date().format('yyyy-MM-dd HH时mm分');
                    const result = `${timeName}\n${content}`;
                    fs.writeFileSync(`./wolf/${timeName}-${meta.num}人局.${extensionFileName}`, result);
                    // program.command(`cd project/zt/${year}/${name}`); // 这句代码尝试了一下无效。。
                    spinner.succeed();
                    console.log(symbols.success, chalk.green('项目初始化成功'));
                // }
            })
        });
program.parse(process.argv);











