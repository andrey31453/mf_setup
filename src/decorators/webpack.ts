import { _dir, _manifest } from '~types'
import { webpack_file_name } from '~config'

//
//
//

const is_webpack = (dir: _dir[]) =>
	dir.reduce((is_webpack, path) => {
		if (new RegExp(path).test(webpack_file_name)) is_webpack = false

		return is_webpack
	}, true)

export const webpack = (value: any, m: _manifest, dir: _dir[]) => {
	if (m.webpack) return value

	return !is_webpack(dir)
}
