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
		const need_method = this.need_method(includes, excludes)
		this.value = need_method(path, includes, excludes)
	}

	private need_method = (includes: string[], excludes: string[]): Function =>
		(includes && this.is_include_file) ||
		(excludes && this.is_exclude_file) ||
		(() => true)

	private is_include_file = (
		path: string,
		includes: string[],
		excludes: string[]
	): boolean => this.test(path, includes)

	private is_exclude_file = (
		path: string,
		includes: string[],
		excludes: string[]
	): boolean => !this.test(path, excludes)

	private test = (path: string, data: string[]) =>
		data.reduce((test, data_elem) => {
			return test || new RegExp(data_elem).test(path)
		}, false)
}

//
//
//

export class Not_Need implements _value<boolean> {
	readonly value

	constructor(
		path: string,
		includes: string[] = null,
		excludes: string[] = null
	) {
		this.value = !new Is_Need(path, includes, excludes).value
	}
}
