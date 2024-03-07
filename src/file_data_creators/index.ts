import { paths } from '~config'
import { _file_data_creator } from '~types'
import { Readme } from './readme'
import { Gitignore } from './gitignore'
import { Docker_Compose } from './docker_compose'
import { Webpack_Config } from './webpack_config'
import { TS_Config } from './ts_config'
import { Package } from './package'

const creators = {
  readme: {
    data_creator: new Readme(),
    file_name: paths.file.readme,
  },

  webpack_config: {
    data_creator: new Webpack_Config(),
    file_name: paths.file.webpack_config,
  },

  docker_compose_dev: {
    data_creator: new Docker_Compose(paths.file.dockerfile.dev),
    file_name: paths.file.docker_compose.dev,
  },

  ts_config: {
    data_creator: new TS_Config(),
    file_name: paths.file.ts_config,
  },

  package: {
    data_creator: new Package(),
    file_name: paths.file.package,
  },

  gitignore: {
    data_creator: new Gitignore(),
    file_name: paths.file.gitignore,
  },
}

export const init_files: _file_data_creator[] = [
  creators.readme,
  creators.webpack_config,
  creators.docker_compose_dev,
  creators.ts_config,
  creators.package,
]

export const preset_files: _file_data_creator[] = [
  creators.ts_config,
  creators.package,
]

export const gitignore: _file_data_creator[] = [creators.gitignore]
