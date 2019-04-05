/**
 * substitute element in array
 * @param arr
 * @param index
 * @param data
 * @return {any[]}
 */
export function substituteElement(arr, index, data) {
	const len = arr.length;
	const ret = Array(len);

	for (let i = 0; i < len; i++) {
		if (i === index) {
			ret[i] = data;
		} else {
			ret[i] = arr[i];
		}
	}

	return ret;
}

/**
 * remove element in array
 * @param arr []
 * @param index number
 * @returns {Array} new array
 */
export function removeElement(arr: any[], index: number) {
	const len: number = arr.length;
	const ret = Array(len - 1);

	for (let i = 0, j = 0; i < len; i++) {
		if (i !== index) {
			ret[j++] = arr[i];
		}
	}

	return ret;
}

/**
 * clone primitive array
 * @param arr string|number|boolean[]
 * @return string|number|boolean[] clone
 */
export function cloneArray(arr) {
	const len = arr.length;
	const ret = Array(len);
	for (let i = 0; i < len; i++) {
		ret[i] = arr[i];
	}

	return ret;
}

/**
 * deep copy, with prototype
 * @param o T
 * @return T clone
 */
export function clone(o) {
	let v;
	const output = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));

	for (const key in o) {
		v = o[key];
		output[key] = (typeof v === 'object') ? clone(v) : v;
	}

	return output;
}
