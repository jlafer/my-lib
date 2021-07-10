import * as R from 'ramda';

const log = x => console.log('tap value:', x);


function safeChar(c) {
	if (c === '"')
		return "'";
	if (c === '\\')
		return '\\\\';
	return c;
}

function jsonSafe(scalar) {
	if (typeof scalar !== 'string')
		return scalar;
	let safe = '';
	for (let c of scalar) {
		safe += safeChar(c);
	}
	return safe;
}

const arrToStr = R.curry((levels, arr) => {
	if (levels === 0)
		return '[]';
	const varToStrLvl = varToStr(levels);
	return '[' + arr.map(varToStrLvl).join(',\n') + ']';
});

const kvToStr = R.curry((levels, kv) => {
	const [k, v] = kv;
	const varToStrLvl = varToStr(levels);
	return `"${k}":${varToStrLvl(v)}`;
});

const objToStr = R.curry((levels, obj) => {
	if (levels === 0)
		return '{}';
	const kvToStrLvl = kvToStr(levels);
	return '{' + Object.entries(obj).map(kvToStrLvl).join(',\n') + '}';
});

export const varToStr = R.curry((levels, variable) => {
	if (typeof variable === 'undefined')
		return '"undefined"';
	if (variable == null)
		return 'null';
	if (Array.isArray(variable))
		return arrToStr(levels-1, variable);
	if (typeof variable === 'function')
		return '"function () {}"';
	if (typeof variable === 'object')
		return objToStr(levels-1, variable);
	return `"${jsonSafe(variable)}"`;
});
