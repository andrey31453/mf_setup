import { i_dir, i_manifest } from '~types'
import { webpack_file_name } from '~config'

//
//
//

const is_webpack = (dir: i_dir[]) =>
	dir.reduce((is_webpack, path) => {
		if (new RegExp(webpack_file_name).test(path)) is_webpack = false

		return is_webpack
	}, true)

export const webpack = (value: any, m: i_manifest, dir: i_dir[]) => {
	if (m.webpack) return value

	return is_webpack(dir)
}
