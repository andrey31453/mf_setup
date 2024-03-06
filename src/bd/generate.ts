import { _generate, _generate_data, _bd_name, _value, _manifest } from '~types'
import { not_gitignore } from '~config'
import { rm } from '~fs'
import { BD } from './bd'

//
//
//

class Not_Gitignore implements _value<boolean> {
	readonly value

	constructor(m: _manifest, path: string) {
		this.value = false
	}
}

//
//
//

export class Generate implements _generate {
	value = [] as _generate_data[]

	constructor(private name: _bd_name) {}

	add = (m: _manifest, generate_data: _generate_data) => {
		// TODO add not_gitignore data for prettier
		if (new Not_Gitignore(m, generate_data).value) return

		this.value.push(generate_data)
	}

	set = () => {
		this.rm_not_writtable()
		this.set_bd()
		this.reset()
	}

	private rm_not_writtable = () => this.not_writtable().forEach(rm)

	private not_writtable = (): _generate_data[] =>
		this.bd_data().filter((b) => !this.value.includes(b))

	private bd_data = (): _generate_data[] => new BD(this.name).get()

	private set_bd = () => new BD(this.name).set(this.value)

	private reset = () => (this.value = [] as _generate_data[])
}
