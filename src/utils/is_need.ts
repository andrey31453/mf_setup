import { _value } from '~types'

//
//
//

export class Is_Need implements _value<boolean> {
	readonly value

	constructor(
		path: string,
		includes: string[] = null,
		excludes: string[] = null
	) {
		// console.log('---- ---- ---- ----')
		// console.log('props: ', props.includes)
		// console.log('props: ', props.excludes)
		// console.log('paths: ', paths)
		const need_method = this.need_method(includes, excludes)
		this.value = need_method.call(this, path, includes, excludes)
	}

	need_method = (includes: string[], excludes: string[]): Function =>
		(includes && this.is_include_file) ||
		(excludes && this.is_exclude_file) ||
		(() => true)

	is_include_file(
		path: string,
		includes: string[],
		excludes: string[]
	): boolean {
		// console.log('---- ---- ---- ----')
		// console.log('includes: ', includes)
		// console.log('paths: ', paths)
		// console.log('test: ', this.test(includes, paths))
		return this.test(path, includes)
	}

	is_exclude_file(
		path: string,
		includes: string[],
		excludes: string[]
	): boolean {
		// console.log('---- ---- ---- ----')
		// console.log('excludes: ', excludes)
		// console.log('paths: ', paths)
		// console.log('test: ', this.test(excludes, paths))
		return !this.test(path, excludes)
	}

	test = (path: string, data: string[]) =>
		data.reduce((test, data_elem) => {
			return test || new RegExp(data_elem).test(path)
		}, false)
}
