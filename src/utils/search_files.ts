import { _value } from '~types'
import { is_dir, is_file, read_dir } from '~fs'
import { Path } from './path'

const exclude_dirs = ['node_modules', 'src', '.git']
type _file_paths = string[]

//
//
//

export class Search_Files implements _value<_file_paths> {
	readonly value: _file_paths

	private searching_files: string[] = []
	private include_dirs: string[] = []

	constructor(
		private dirs: string[] | string,
		private file_name: string
	) {
		this.correct_input()
		this.search_files()
		this.search_include_dirs()
		this.value = this.create_value()
	}

	private correct_input = () => {
		if (!Array.isArray(this.dirs)) this.dirs = [this.dirs]
	}

	private search_files = () => (this.dirs as string[]).forEach(this.search_file)

	private search_file = (dir: string) => {
		const searching_file = new Path(dir, this.file_name).value

		if (is_file(searching_file)) this.searching_files.push(searching_file)
	}

	private search_include_dirs = () =>
		(this.dirs as string[]).forEach(this.search_include_dir)

	private search_include_dir = (dir: string) =>
		this.include_dirs.push(
			...read_dir(dir)
				.filter((include) => !exclude_dirs.includes(include))
				.map((include) => new Path(dir, include).value)
				.filter(is_dir)
		)

	private create_value = (): _file_paths =>
		this.include_dirs.length
			? [
					...this.searching_files,
					...new Search_Files(this.include_dirs, this.file_name).value,
				]
			: this.searching_files
}
