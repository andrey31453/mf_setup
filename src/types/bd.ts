type _path = string

export type _generate_data = {
	absolute?: _path
	module?: _path
	dir?: _path
	not_gitignore?: _path
}

export type _generate_data_key = keyof _generate_data

export interface _generate {
	value: _generate_data[]
	add: (data: _generate_data) => void
	set: () => void
}

export type _bd_name = 'init' | 'update'
