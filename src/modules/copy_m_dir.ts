import { i_copy_m_dir, i_manifest, i_value, i_generate } from '~types'
import { read_file, read_dir, is_dir } from '~fs'
import { Create_M } from './create_m'
import { Path } from '~utils'

//
//
//

type i_dir = string[] | null
type i_dir_path = string | null

class Dirs implements i_value<i_dir> {
	readonly value

	constructor(initial_dir: string, file_path: string) {
		this.value = this.dirs(this.dir_path(initial_dir, file_path))
	}

	private dir_path = (initial_dir: string, file_path: string): i_dir_path =>
		file_path.replace(/\/[^/]*$/, '').replace(new RegExp(initial_dir), '') ||
		null

	private dirs = (dir_path: i_dir_path): i_dir => {
		if (!dir_path) return null

		return dir_path
			.split('/')
			.filter(Boolean)
			.reduce((dirs, dir) => [...dirs, new Path(...dirs, dir).value], [])
	}
}

//
//
//

interface i_file_data {
	dirs: string[] | null
	path: string
	name: string
}

class Files_Data implements i_value<i_file_data[]> {
	readonly value

	constructor(initial_dir: string) {
		this.value = this.file_data(initial_dir, initial_dir) || null
	}

	private file_data = (initial_dir: string, dir_path: string): i_file_data[] =>
		read_dir(dir_path)
			.map((dir_include) =>
				is_dir(new Path(dir_path, dir_include).value)
					? this.file_data(initial_dir, new Path(dir_path, dir_include).value)
					: this.create_data_elem(initial_dir, dir_path, dir_include)
			)
			.flat()

	private create_data_elem = (
		initial_dir: string,
		dir_path: string,
		name: string
	): i_file_data => {
		const path = new Path(dir_path, name).value

		return {
			dirs: new Dirs(initial_dir, path).value,
			path,
			name,
		}
	}
}

//
//
//

export class Copy_M_Dir extends Create_M implements i_copy_m_dir {
	constructor(manifests: i_value<i_manifest[]>, generate: i_generate) {
		super(manifests, generate)
	}

	private create_dirs = (files_data: i_file_data[]) =>
		files_data.map((file_data) => {
			if (!file_data.dirs) return

			file_data.dirs.forEach(this.create_dir)
		})

	private create_files = (files_data: i_file_data[]) =>
		files_data.map((file_data) =>
			this.create_file(
				() => read_file(file_data.path),
				file_data.name,
				file_data.dirs?.at(-1)
			)
		)

	copy(copy_dir: string): i_copy_m_dir {
		const files_data = new Files_Data(copy_dir).value

		this.create_dirs(files_data)
		this.create_files(files_data)

		return this
	}
}