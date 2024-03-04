import { paths } from './paths'

export const delimiters = {
	data: ' || ',
	file: '.',
}

export const exclude_for_generate_data = [
	paths.file.gitignore,
	paths.file.readme,
	paths.dir.bd,
	paths.file.package,
	paths.file.ts_config,
]
