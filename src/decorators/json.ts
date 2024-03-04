export const field_prefix = (fileld: string) =>
	function (v: string) {
		return `"${fileld}": ${v}`
	}
