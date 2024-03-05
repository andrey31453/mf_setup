import { i_file_manifest, i_value, i_dir } from '~types'
import { Path } from '~utils'
import { d, webpack } from '~decorators'

//
//
//

interface _all_bds_data__props {
	excludes?: string[]
	includes?: string[]
}

export class Is_Need implements i_value<boolean> {
	readonly value

	constructor(manifest: _all_bds_data__props, ...paths: i_dir[]) {
		const is_correct_file = this.is_need_method(manifest)
		this.value = is_correct_file.call(this, manifest, paths)
	}

	is_need_method = (manifest: _all_bds_data__props): Function =>
		(manifest.includes && this.is_include_file) ||
		(manifest.excludes && this.is_exclude_file) ||
		(() => true)

	@d(webpack)
	is_include_file({ includes }: _all_bds_data__props, paths: i_dir[]): boolean {
		return this.test(includes, paths)
	}

	@d(webpack)
	is_exclude_file({ excludes }: _all_bds_data__props, paths: i_dir[]): boolean {
		return !this.test(excludes, paths)
	}

	test = (data: string[], paths: i_dir[]) => {
		const path = new Path(...paths).value

		return data.reduce(
			(test, data_elem) => test || new RegExp('^' + path).test(data_elem),
			false
		)
	}
}
