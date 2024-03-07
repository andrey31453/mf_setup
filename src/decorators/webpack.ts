import { _manifest } from '~types'
import { webpack_files } from '~config'
import { Is_Need } from '~utils'

//
//
//

export const webpack = (value: any, path: string, m: _manifest) => {
	if (m.webpack) return value

	return new Is_Need(path, null, webpack_files).value
}
