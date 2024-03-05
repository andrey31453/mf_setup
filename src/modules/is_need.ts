import { _file_manifest, _value, _dir, _is_need__props } from '~types'
import { Path } from '~utils'
import { d, webpack } from '~decorators'

//
//
//

export class Is_Need implements _value<boolean> {
	readonly value

	constructor(props: _is_need__props, ...paths: _dir[]) {
		// console.log('---- ---- ---- ----')
		// console.log('props: ', props.includes)
		// console.log('props: ', props.excludes)
		// console.log('paths: ', paths)
		const need_method = this.need_method(props)
		this.value = need_method.call(this, props, paths)
	}

	need_method = ({ includes, excludes }: _is_need__props): Function =>
		(includes && this.is_include_file) ||
		(excludes && this.is_exclude_file) ||
		(() => true)

	@d(webpack)
	is_include_file({ includes }: _is_need__props, paths: _dir[]): boolean {
		// console.log('---- ---- ---- ----')
		// console.log('includes: ', includes)
		// console.log('paths: ', paths)
		// console.log('test: ', this.test(includes, paths))
		return this.test(includes, paths)
	}

	@d(webpack)
	is_exclude_file({ excludes }: _is_need__props, paths: _dir[]): boolean {
		console.log('---- ---- ---- ----')
		console.log('excludes: ', excludes)
		console.log('paths: ', paths)
		console.log('test: ', this.test(excludes, paths))
		return !this.test(excludes, paths)
	}

	test = (data: string[], paths: _dir[]) =>
		data.reduce((test, data_elem) => {
			return test || new RegExp(data_elem).test(new Path(...paths).value)
		}, false)
}
