import { _manifest } from '~types'
import { webpack_files, compose_files } from '~config'
import { Is_Need } from '~utils'

//
//
//

export const webpack = (value: any, path: string, m: _manifest) => {
	if (!value) return value
	if (m.webpack) return value

	return new Is_Need(path, null, webpack_files).value
}

//
//
//

export const compose = (value: any, path: string, m: _manifest) => {
	if (!value) return value
	if (m.compose) return value

	return new Is_Need(path, null, compose_files).value
}
