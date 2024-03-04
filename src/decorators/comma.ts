export const comma_before = function (val: string): string {
	return ', ' + val
}

export const comma_after = function (val: string): string {
	return val + ', '
}

export const delete_last_comma = function (val: string): string {
	return val.replace(/,\s*$/, '')
}
