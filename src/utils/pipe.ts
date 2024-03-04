//
//
//

export const pipe =
	(...fns: Function[]) =>
	(...init_v: any[]) =>
		fns.reduce((v, fn) => fn(...[v].flat()), init_v)

//
//
//

export const compose =
	(...fns: Function[]) =>
	(init_v: any) =>
		fns.reduceRight((v, fn) => fn(...[v].flat()), init_v)
