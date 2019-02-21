const program = require('commander')

/* program
    .option('-a --aa', 'A')
    .option('-b|--bb [arg]', 'B', /bbb/)
    .option('-c,--cc [arg]', 'C', (arg1, arg2) => {console.log(arg1, arg2);}, 'defaultC')
    .option('-d, --dd [arg]', 'D', 'default')
    .option('-e --ee <arg>')
    .option('--no-ff')
    .parse(process.argv)
console.log(program.aa, program.bb, program.cc, program.dd, program.ff); 
*/
/* 
    输入:node index -a -b bbb -c ccc -d ddd -e aaa
    输出:
    ccc defaultC
    true 'bbb' undefined 'ddd' true
*/

/* program
    .command('rm <dir>')
    .option('-r, --rr')
    .action(function () {
        console.log(arguments)
    })
 
program.parse(process.argv) */

/* 
    输入:node index rm a -r
    输出:
    ['a', {Connand对象}]
*/

/* program
    .command('rmdir <dir> [otherDirs...]')
    .action(function(dir, otherDirs){
        console.log(arguments);
    })
program.parse(process.argv) */

/* 
    输入:node index rmdir a.js b.js c.js
    输出:
    ['a.js',['b.js','c.js'],{Connand对象}]
*/

/* let cmdValue, envValue;
program
    .arguments('<cmd> [envs...]')
    .action(function(cmd, envs) {
        cmdValue = cmd;
        envValue = envs;
    });
program.parse(process.argv);
console.log(cmdValue, envValue); */

/* 
    输入:node index rmdir a.js b.js c.js
    输出:
    rmdir ['a.js', 'b.js']
*/

/* program
    .command('start','自调用同名文件-command,这里是index-start.js');
program.parse(process.argv); */

/* 
    输入:node index.js start
    输出:
    'start'
*/

/* program
    .option('-s --ss')
    .command('start')
    .action(function() {
        console.log('action');
    });
// error on unknown commands
program.on('command:*', function () {
    console.log('command',arguments);
});
program.on('command:start', function () {
    console.log('start');
});
program.on('option:ss', function () {
    console.log('option');
});
program.parse(process.argv); */

/* 
    输入:node index start -s
    输出:
    'option'
    'action'
    'start'
*/