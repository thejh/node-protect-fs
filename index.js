var fs = require('fs')

if (fs._nullbyteWrappersActive) return
fs._nullbyteWrappersActive = true

function safeWrapFsMethod(name) {
  if (!fs[name]) return
  var args = [].slice.call(arguments, 1)
  args.push(fs[name])
  fs[name] = safeWrap.apply(this, args)
}

function safeWrap(isAsync) {
  var unsafeArgs = [].slice.call(arguments, 1, arguments.length-1);
  var f = arguments[arguments.length-1];
  function fail(n, maybeCb) {
    var err = new Error("fs function was called with a nullbyte in argument #"+n);
    if (typeof maybeCb === 'function') {
      process.nextTick(maybeCb.bind(null, err));
    } else {
      throw err;
    }
  }
  if (unsafeArgs.length === 1) {
    var unsafeArg = unsafeArgs[0];
    return function() {
      if (arguments[unsafeArg].indexOf('\0') !== -1) {
        return fail(unsafeArg, arguments[arguments.length-1]);
      }
      return f.apply(this, arguments);
    };
  } else {
    return function() {
      for (var i=0; i<unsafeArgs.length; i++) {
        if (arguments[unsafeArgs[i]].indexOf('\0') !== -1) {
          return fail(unsafeArgs[i], arguments[arguments.length-1]);
        }
      }
      return f.apply(this, arguments);
    };
  }
}

safeWrapFsMethod("open", true, 0)
safeWrapFsMethod("openSync", false, 0)
safeWrapFsMethod("rename", true, 0, 1)
safeWrapFsMethod("renameSync", false, 0, 1)
safeWrapFsMethod("rmdir", true, 0)
safeWrapFsMethod("rmdirSync", false, 0)
safeWrapFsMethod("mkdir", true, 0)
safeWrapFsMethod("mkdirSync", false, 0)
safeWrapFsMethod("readdir", true, 0)
safeWrapFsMethod("readdirSync", false, 0)
safeWrapFsMethod("lstat", true, 0)
safeWrapFsMethod("stat", true, 0)
safeWrapFsMethod("lstatSync", false, 0)
safeWrapFsMethod("statSync", false, 0)
safeWrapFsMethod("readlink", true, 0)
safeWrapFsMethod("readlinkSync", false, 0)
safeWrapFsMethod("symlink", true, 0, 1)
safeWrapFsMethod("symlinkSync", false, 0, 1)
safeWrapFsMethod("link", true, 0, 1)
safeWrapFsMethod("linkSync", false, 0, 1)
safeWrapFsMethod("unlink", true, 0)
safeWrapFsMethod("unlinkSync", false, 0)
safeWrapFsMethod("chmod", true, 0)
safeWrapFsMethod("chmodSync", false, 0)
safeWrapFsMethod("chown", true, 0)
safeWrapFsMethod("chownSync", false, 0)
safeWrapFsMethod("utimes", true, 0)
safeWrapFsMethod("utimesSync", false, 0)
safeWrapFsMethod("watchFile", false, 0)
