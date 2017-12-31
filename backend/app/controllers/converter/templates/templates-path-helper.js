var path = require('path');
var _root, _preRoot;
switch (process.env.LOGNAME) {
    case 'sysadmin':
        console.log('LOGNAME', process.env.LOGNAME);
        _preRoot = path.resolve(__dirname, '..');
        _root = _preRoot +'/templates';
        break;
    case 'ubuntu':
        console.log('LOGNAME', process.env.LOGNAME);
        _preRoot = path.resolve(__dirname, '..');
        _root = _preRoot +'/templates';
        break;
    default:
        console.log('LOGNAME', process.env.LOGNAME);
        _preRoot = path.resolve(__dirname, '..');
        _root = _preRoot +'/templates';
        break;
}

//console.log('root helper root', _root);
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

exports.root = root;