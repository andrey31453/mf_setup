import { _manifest, _data_creator } from '~types'
import { Field_Value, concat_spread } from '~utils'
import {
  packages,
  webpack_packages,
  react_packages,
  default_scripts,
} from '~config'

//
//
//

export class Package implements _data_creator {
  constructor() {}

  create_data = (
    file_name: string,
    m: _manifest,
    manifests: _manifest[]
  ): string => `{
	${
    new Field_Value({
      field: 'scripts',
      values: [
        m.scripts,
        // @ts-ignore
        m.webpack && m.default_scripts && default_scripts,
      ],
      iterator: (script: string, script_name: string) =>
        `"${script_name}": "${script}"`,
    }).value
  }
	${
    new Field_Value({
      field: 'dependencies',
      value: concat_spread(m.dependencies, m.react && react_packages),
      iterator: (pg: keyof typeof packages) => `"${pg}": "${packages[pg]}"`,
    }).value
  }
	${
    new Field_Value({
      field: 'devDependencies',
      value: concat_spread(m.dev_dependencies, m.webpack && webpack_packages),
      iterator: (pg: keyof typeof packages) => `"${pg}": "${packages[pg]}"`,
    }).value
  }
	"name": "${m.name}",
	"version": "1.0.0",
	"license": "MIT"
}`
}
