import { paths } from '~config'
import { _file_data_creator } from '~types'
import { Readme } from './readme'
import { Gitignore } from './gitignore'
import { Compose } from './compose'
import { Webpack } from './webpack'
import { TS_Config } from './ts_config'
import { Package } from './package'
import { Version } from './version'

//
//
//

interface _creators {
  [key: string]: _file_data_creator
}

const creators: _creators = {
  readme: {
    data_creator: new Readme(),
    file_name: paths.file.readme,
  },

  webpack: {
    data_creator: new Webpack(),
    file_name: paths.file.webpack,
  },

  compose_dev: {
    data_creator: new Compose(paths.file.dockerfile.dev),
    file_name: paths.file.compose.dev,
  },

  ts_config: {
    data_creator: new TS_Config(),
    file_name: paths.file.ts_config,
  },

  package: {
    data_creator: new Package(),
    file_name: paths.file.package,
  },

  version: {
    data_creator: new Version(),
    file_name: paths.file.version,
  },

  gitignore: {
    data_creator: new Gitignore(),
    file_name: paths.file.gitignore,
  },
}

//
//
//

interface _generates {
  [key: string]: _file_data_creator[]
}

export const generates: _generates = {
  init: [
    creators.readme,
    creators.webpack,
    creators.compose_dev,
    creators.ts_config,
    creators.version,
    creators.package,
  ],

  preset: [creators.ts_config, creators.package],

  update: [creators.version],

  gitignore: [creators.gitignore],
}
