import { _generate, _generate_data, _bd_name, _value, _manifest } from '~types'
import { not_bd } from '~config'
import { rm } from '~fs'
import { Is_Need } from '~utils'
import { BD } from './bd'

//
//
//

class Not_BD implements _value<boolean> {
	readonly value

	constructor(path: string, m: _manifest) {
		console.log('path: ', path)
		this.value = !new Is_Need(path, null, not_bd).value
		console.log('this.value: ', this.value)
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
		if (new Is_Need(generate_data, null, not_bd).value) return

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
