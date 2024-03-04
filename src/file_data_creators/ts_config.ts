import { i_manifest, i_data_creator } from '~types'
import { SRC, Field_Value } from '~utils'

//
//
//

export class TS_Config implements i_data_creator {
	constructor() {}

	create = (
		file_name: string,
		m: i_manifest,
		manifests: i_manifest[]
	): string => {
		return `{
	"compileOnSave": false,
	"compilerOptions": {
		${
			new Field_Value({
				field: 'paths',
				value: m.aliases,
				iterator: (aliase_value: string, aliase_key: string) =>
					`"${aliase_key}": ["${new SRC(m).value}/${aliase_value}"]`,
			}).value
		}
		"moduleResolution": "node",
		"noImplicitAny": true,
		"removeComments": true,
		"preserveConstEnums": true,
		"sourceMap": true,
		"declaration": true,
		"isolatedModules": true,
		"downlevelIteration": true,
		"outDir": "dist"
	},
	"ts-node": {
		"require": ["tsconfig-paths/register"]
	}
}`
	}
}
