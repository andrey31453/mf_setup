import {
	_generate,
	_generate_data,
	_generate_data_key,
	_bd_name,
	_value,
	_manifest,
} from '~types'
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
	private recordable_keys: _generate_data_key[] = ['file', 'dir']

	constructor(private name: _bd_name) {}

	add = (m: _manifest, generate_data: _generate_data) => {
		// TODO add not_gitignore data for prettier
		if (new Not_Gitignore(m, generate_data.value).value) return

		this.value.push(generate_data)
	}

	set = () => this.recordable_keys.forEach(this.set_for_key)

	private set_for_key = (key: _generate_data_key) =>
		this.not_writtable(key).forEach(rm)

	private not_writtable = (key: _generate_data_key): string[] =>
		this.bd_data(key).filter((b) => !this.value.find((g) => g.value === b))

	private bd_data = (key: _generate_data_key) =>
		new BD(this.name, key, this.value).value
}
