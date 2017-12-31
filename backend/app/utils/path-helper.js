var path = require('path');
var _root, _frontend;
switch (process.env.LOGNAME) {
    case 'sysadmin':

        _root = path.resolve(__dirname, '..');
		_frontend = path.resolve(__dirname, process.env.DEV_FRONT_END_CODE);
		console.log('_frontend', _frontend);
        break;
    case 'ubuntu':
        console.log('LOGNAME', process.env.LOGNAME);
        _root = path.resolve(__dirname, '/home/ubuntu');
        break;
	case 'root':
		_root = path.resolve(__dirname, '..');
		_frontend = path.resolve(__dirname, process.env.DEV_FRONT_END_CODE);
		console.log('_frontend', _frontend);
		break;
    default:
        break;
}

//console.log('root helper root', _root);
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function frontend(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [_frontend].concat(args));
}

exports.frontend = frontend;
exports.root = root;

