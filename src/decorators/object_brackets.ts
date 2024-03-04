export const object_brackets = function (val: string, ...args: any[]): string {
	return `{${val}}`
}

export const object_open_bracket = function (
	val: string,
	...args: any[]
): string {
	return `{${val}`
}

export const object_close_bracket = function (
	val: string,
	...args: any[]
): string {
	return `${val}}`
}
