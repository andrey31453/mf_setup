import { i_bd_name } from './bd'
import { i_file_data_creator } from './modules'

export interface i_setup_params {
	bd_name: i_bd_name
	generates?: i_file_data_creator[]
	copy?: string
}
