import { _manifest, _data_creator } from '~types'
import { SRC, Field_Value } from '~utils'
import { fsd_aliases } from '~config'

//
//
//

export class TS_Config implements _data_creator {
	constructor() {}

	create_data = (
		file_name: string,
		m: _manifest,
		manifests: _manifest[]
	): string => {
		return `{
	"compileOnSave": false,
	"compilerOptions": {
		${
			new Field_Value({
				field: 'paths',
				values: [m.aliases, m.fsd && fsd_aliases],
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
		"outDir": "dist",
		"target": "ES2016",
		"lib": ["es2019", "dom"]
	},
	"ts-node": {
		"require": ["tsconfig-paths/register"]
	}
}`
	}
}
