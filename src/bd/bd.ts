import {
	_generate_data,
	_generate_data_key,
	_bd_name,
	_is_need__props,
	_value,
} from '~types'
import { paths, delimiters } from '~config'
import { mk_file, read_dir, read_file } from '~fs'
import { Path } from '~utils'
import { Is_Need } from '~modules'

//
//
//

export class BD implements _value<string[]> {
	readonly value

	constructor(
		private name: _bd_name,
		private key: _generate_data_key,
		private generate_data: _generate_data[]
	) {
		this.value = this.read_bd()
		this.set_bd()
	}

	private read_bd = (): string[] =>
		read_file(this.file_name).split(delimiters.data)

	private set_bd = () => mk_file(this.file_name, this.bd_data)

	private get file_name(): string {
		return new Path(paths.dir.bd, [this.name, this.key].join(delimiters.file))
			.value
	}

	private get bd_data(): string {
		return this.generate_data
			.map((g) => g.value)
			.filter(Boolean)
			.join(delimiters.data)
	}
}

//
//
//

export class all_BDs_data implements _value<string[]> {
	readonly value

	constructor(private options: _is_need__props = {}) {
		this.value = read_dir(paths.dir.bd)
			.filter(this.filtered)
			.map((p) => read_file(new Path(paths.dir.bd, p).value))
			.map((d) => d.split(delimiters.data))
			.flat()
			.filter(Boolean)
	}

	private filtered = (path: string) => {
		console.log('---- ---- ---- ----')
		console.log('---- ---- ---- ----')
		console.log('---- ---- ---- ----')
		console.log('---- ---- ---- ----')
		console.log('this.options: ', this.options)
		console.log('path: ', path)
		console.log('Is_Need: ', new Is_Need(this.options, path).value)

		return new Is_Need(this.options, path).value
	}
}
