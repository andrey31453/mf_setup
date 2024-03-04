import { i_value } from '~types'

//
//
//

export class Path implements i_value<string> {
	readonly value

	constructor(...paths: string[]) {
		this.value = paths.filter((p) => !!p).join('/')
	}
}
