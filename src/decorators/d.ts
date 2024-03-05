export const d = function (decorator: Function) {
	return function <
		This extends {},
		Args extends any[],
		Return,
		Fn extends (this: This, ...args: Args) => Return,
	>(target: Fn, ctx: ClassMethodDecoratorContext<This, Fn>) {
		return function (this: This, ...args: Args) {
			const value = target.apply(this, args)
			return decorator.apply(this, [value, ...args])
		}
	}
}
