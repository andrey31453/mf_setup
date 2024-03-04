import { i_file_manifest, i_value, i_dir } from '~types'
import { Path } from '~utils'
import { d, webpack } from '~decorators'

//
//
//

export class Is_Need implements i_value<boolean> {
	readonly value

	constructor(manifest: i_file_manifest, ...paths: i_dir[]) {
		const is_correct_file = this.is_need_method(manifest)
		this.value = is_correct_file.call(this, manifest, paths)
	}

	is_need_method = (manifest: i_file_manifest): Function =>
		(manifest.include_files && this.is_include_file) ||
		(manifest.exclude_files && this.is_exclude_file) ||
		(() => true)

	@d(webpack)
	is_include_file({ include_files }: i_file_manifest, paths: i_dir[]): boolean {
		return this.test(include_files, paths)
	}

	@d(webpack)
	is_exclude_file({ exclude_files }: i_file_manifest, paths: i_dir[]): boolean {
		return !this.test(exclude_files, paths)
	}

	test = (data: string[], paths: i_dir[]) => {
		const path = new Path(...paths).value

		return data.reduce(
			(test, data_elem) => test || new RegExp('^' + path).test(data_elem),
			false
		)
	}
}
