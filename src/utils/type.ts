//
//
//

export const type_is = (target: any, type: string) =>
	Object.prototype.toString
		.call(target)
		.split(' ')[1]
		.toLowerCase()
		.includes(type)

//
//
//

export const type_of = (target: any) =>
	Object.prototype.toString
		.call(target)
		.split(' ')[1]
		.toLowerCase()
		.slice(0, -1)

//
//
//

export const is_nullable = (target: any): target is {} | [] =>
	is_nan(target) || is_undefined(target) || is_null(target)

export const not_nullable = (target: any): target is {} | [] =>
	!is_nullable(target)

export const is_object = (target: any): target is {} =>
	type_is(target, 'object')

export const is_array = (target: any): target is [] => type_is(target, 'array')

export const is_number = (target: any): target is number =>
	typeof target === 'number' && !is_nan(target)

export const is_string = (target: any): target is string =>
	typeof target === 'string'

export const is_function = (target: any): target is Function =>
	typeof target === 'function'

export const is_undefined = (target: any): target is undefined =>
	target === undefined

export const is_null = (target: any): target is null => target === null

export const is_nan = (target: any): target is typeof NaN => target !== target
