import { _manifest } from './data'

export type _generate_data_key = 'file' | 'dir'
type _generate_data_value = string

export interface _generate_data {
	key: _generate_data_key
	value: _generate_data_value
}

export interface _generate {
	value: _generate_data[]
	add: (m: _manifest, data: _generate_data) => void
	set: () => void
}

export type _bd_name = 'init' | 'update'
