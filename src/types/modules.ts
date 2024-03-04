import { Nullable } from './utils'
import { i_manifest } from './data'

export interface i_create_m_file {
	create(
		create_data_method: Function,
		file_name: string,
		dir?: Nullable<string>
	): void
}

export interface i_create_m_dir {
	create(dir_name: string): void
}

export interface i_copy_m_dir {
	copy(dir_name: string): i_copy_m_dir
}

export interface i_generate_m_dir {
	generate(file_data_creators: i_file_data_creator[]): i_generate_m_dir
}

export interface i_data_creator {
	create(file_name: string, m: i_manifest, manifests?: i_manifest[]): string
}

export interface i_file_data_creator {
	data_creator: i_data_creator
	file_name: string
}

export interface i_create_m {
	create_dir(dir_name: string): void

	create_file(
		create_data_method: Function,
		file_name: string,
		dir?: Nullable<string>
	): void
}
