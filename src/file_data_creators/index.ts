import { paths } from '~config'
import { i_file_data_creator } from '~types'
import { Readme } from './readme'
import { Gitignore } from './gitignore'
import { Docker_Compose } from './docker_compose'
import { Webpack_Config } from './webpack_config'
import { TS_Config } from './ts_config'
import { Package } from './package'

export const init_files: i_file_data_creator[] = [
	{
		data_creator: new Readme(),
		file_name: paths.file.readme,
	},

	{
		data_creator: new Webpack_Config(),
		file_name: paths.file.webpack_config,
	},

	{
		data_creator: new Docker_Compose(paths.file.dockerfile.dev),
		file_name: paths.file.docker_compose.dev,
	},

	{
		data_creator: new TS_Config(),
		file_name: paths.file.ts_config,
	},

	{
		data_creator: new Package(),
		file_name: paths.file.package,
	},
]

export const gitignore_data_creator: i_file_data_creator = {
	data_creator: new Gitignore(),
	file_name: paths.file.gitignore,
}
