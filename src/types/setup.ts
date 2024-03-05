import { _bd_name } from './bd'
import { _file_data_creator } from './modules'

export interface _setup_params {
	bd_name: _bd_name
	generates?: _file_data_creator[]
	copy?: string
}
