import {
	i_generate,
	i_generate_data,
	i_generate_data_key,
	i_bd_name,
} from '~types'
import { exclude_for_generate_data } from '~config'
import { rm } from '~fs'
import { BD } from './bd'

//
//
//

export class Generate implements i_generate {
	value = [] as i_generate_data[]
	private recordable_keys: i_generate_data_key[] = ['absolute', 'dir']

	constructor(private name: i_bd_name) {}

	add = (generate_data: i_generate_data) => {
		if (exclude_for_generate_data.includes(generate_data.module)) return

		this.value.push(generate_data)
	}

	set = () => this.recordable_keys.forEach(this.set_for_key)

	private set_for_key = (key: i_generate_data_key) =>
		this.not_writtable(key).forEach(rm)

	private not_writtable = (key: i_generate_data_key): string[] =>
		this.bd_data(key).filter((b) => !this.value.find((g) => g[key] === b))

	private bd_data = (key: i_generate_data_key) =>
		new BD(this.name, key, this.value).value
}
