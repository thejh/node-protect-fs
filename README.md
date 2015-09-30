This module adds some protection against poison null bytes to the native "fs" module. To activate it, just put this at the top of your main application file:

    require('protect-fs')

This modifies all relevant fs methods (I hope I didn't forget any) to give you this protection.

Installation
============

    npm install protect-fs

Examples
========

    > require('fs').readFileSync('/etc/passwd\0', 'utf8').length
    2226
    > require('fs').readFile('/etc/passwd\0', 'utf8', function(e,d){if(e){console.error('error cb');throw e;}console.log(d.length)})
    > 2226
    
    > require('protect-fs')
    {}
    > require('fs').readFileSync('/etc/passwd\0', 'utf8').length
    Error: fs function was called with a nullbyte in argument #0
        at fail (/home/jann/tmp/node_modules/protect-fs/index.js:17:15)
        at Object.openSync (/home/jann/tmp/node_modules/protect-fs/index.js:28:16)
        at Object.readFileSync (fs.js:113:15)
        at repl:1:16
        at REPLServer.eval (repl.js:80:21)
        at Interface.<anonymous> (repl.js:182:12)
        at Interface.emit (events.js:67:17)
        at Interface._onLine (readline.js:162:10)
        at Interface._line (readline.js:426:8)
        at Interface._ttyWrite (readline.js:603:14)
    > require('fs').readFile('/etc/passwd\0', 'utf8', function(e,d){if(e){console.error('error cb');throw e;}console.log(d.length)})
    > error cb
    
    node.js:202
            throw e; // process.nextTick error, or 'error' event on first tick
                  ^
    Error: fs function was called with a nullbyte in argument #0
        at fail (/home/jann/tmp/node_modules/protect-fs/index.js:17:15)
        at Object.open (/home/jann/tmp/node_modules/protect-fs/index.js:28:16)
        at new <anonymous> (fs.js:1019:6)
        at Object.createReadStream (fs.js:973:10)
        at Object.readFile (fs.js:71:23)
        at repl:1:16
        at REPLServer.eval (repl.js:80:21)
        at Interface.<anonymous> (repl.js:182:12)
        at Interface.emit (events.js:67:17)
        at Interface._onLine (readline.js:162:10)

