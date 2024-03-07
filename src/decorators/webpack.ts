import { _manifest } from '~types'
import { webpack_file_name } from '~config'

//
//
//

const is_webpack = (path: string) => new RegExp(webpack_file_name).test(path)

export const webpack = (value: any, m: _manifest, path: string) => {
	if (m.webpack) return value

	return !is_webpack(path)
}
