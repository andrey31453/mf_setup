type i_path = string

export type i_generate_data = {
	absolute?: i_path
	module?: i_path
	dir?: i_path
}

export type i_generate_data_key = keyof i_generate_data

export interface i_generate {
	value: i_generate_data[]
	add: (data: i_generate_data) => void
	set: () => void
}

export type i_bd_name = 'init' | 'update'
