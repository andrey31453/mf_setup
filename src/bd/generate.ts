import { _generate, _generate_data, _generate_data_key, _bd_name } from '~types'
import { not_gitignore } from '~config'
import { rm } from '~fs'
import { BD } from './bd'

//
//
//

export class Generate implements _generate {
	value = [] as _generate_data[]
	private recordable_keys: _generate_data_key[] = ['absolute', 'dir']

	constructor(private name: _bd_name) {}

	add = (generate_data: _generate_data) => {
		if (not_gitignore.includes(generate_data.module)) {
			// this.value.push({
			// 	not_gitignore: generate_data.absolute,
			// })
			return
		}

		this.value.push(generate_data)
	}

	set = () => this.recordable_keys.forEach(this.set_for_key)

	private set_for_key = (key: _generate_data_key) =>
		this.not_writtable(key).forEach(rm)

	private not_writtable = (key: _generate_data_key): string[] =>
		this.bd_data(key).filter((b) => !this.value.find((g) => g[key] === b))

	private bd_data = (key: _generate_data_key) =>
		new BD(this.name, key, this.value).value
}
