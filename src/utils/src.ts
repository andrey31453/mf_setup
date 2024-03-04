import { paths } from '~config'
import { i_manifest, i_value } from '~types'

//
//
//

export class SRC implements i_value<string> {
	readonly value

	constructor(m: i_manifest) {
		this.value = m.src || paths.dir.src
	}
}
