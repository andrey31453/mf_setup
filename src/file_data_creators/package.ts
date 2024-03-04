import { i_manifest, i_data_creator } from '~types'
import { Field_Value } from '~utils'
import { packages } from '~config'

//
//
//

export class Package implements i_data_creator {
	constructor() {}

	create = (
		file_name: string,
		m: i_manifest,
		manifests: i_manifest[]
	): string => {
		return `{
	"scripts": {
		"init": "ts-node ./src/init.ts"
	},
	${
		new Field_Value({
			field: 'dependencies',
			value: m.dependencies,
			iterator: (pg: keyof typeof packages) => `"${pg}": "${packages[pg]}"`,
		}).value
	}
	${
		new Field_Value({
			field: 'devDependencies',
			value: m.dev_dependencies,
			iterator: (pg: keyof typeof packages) => `"${pg}": "${packages[pg]}"`,
		}).value
	}

	"name": "${m.name}",
	"version": "1.0.0",
	"license": "MIT"
}`
	}
}
