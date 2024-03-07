import { Nullable } from './utils'
import { _manifest } from './data'

export interface _create_m_file {
	create(
		create_data_method: Function,
		file_name: string,
		dir?: Nullable<string>
	): void
}

export interface _create_m_dir {
	create(dir_name: string): void
}

export interface _copy_m_dir {
	copy(dir_name: string): _copy_m_dir
}

export interface _generate_m_file {
	generate(file_data_creators: _file_data_creator[]): _generate_m_file
}

export interface _data_creator {
	create(file_name: string, m: _manifest, manifests?: _manifest[]): string
}

export interface _file_data_creator {
	data_creator: _data_creator
	file_name: string
}

export interface _create_m {
	create_dir(dir_name: string): void

	create_file(
		create_data_method: Function,
		file_name: string,
		dir?: Nullable<string>
	): void
}

export interface _format {
	format(): void
}
