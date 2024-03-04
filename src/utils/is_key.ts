export const is_key = (
	target: object,
	key: string | symbol
): key is keyof typeof target => key in target
