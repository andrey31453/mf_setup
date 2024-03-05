import { _value } from '~types'

//
//
//

export class Path implements _value<string> {
	readonly value

	constructor(...paths: string[]) {
		this.value = paths.filter((p) => !!p).join('/')
	}
}
