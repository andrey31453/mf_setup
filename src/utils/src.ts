import { paths } from '~config'
import { _manifest, _value } from '~types'

//
//
//

export class SRC implements _value<string> {
	readonly value

	constructor(m: _manifest) {
		this.value = m.src || paths.dir.src
	}
}
