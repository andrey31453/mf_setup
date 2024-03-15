import { _manifest, _data_creator } from '~types'
import { Field_Value } from '~utils'
import { packages, default_scripts } from '~config'

//
//
//

const name_value_iterator = (value: string, name: string) =>
  `"${name}": "${value}"`

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
      iterator: name_value_iterator,
    }).value
  }
	${
    new Field_Value({
      field: 'dependencies',
      values: [
        // @ts-ignore
        m.react && packages.react,
        // @ts-ignore
        m.node && packages.node,
      ],
      iterator: name_value_iterator,
    }).value
  }
	${
    new Field_Value({
      field: 'devDependencies',
      values: [
        // @ts-ignore
        m.webpack && packages.webpack,
        // @ts-ignore
        m.semantic && packages.semantic,
        // @ts-ignore
        m.arora && packages.arora,
      ],
      iterator: name_value_iterator,
    }).value
  }
  "browserslist": [
    "defaults and fully supports es6"
  ],
	"name": "${m.name}",
	"version": "1.0.0",
	"license": "MIT"
}`
}
