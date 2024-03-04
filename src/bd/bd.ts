import {
	i_generate_data,
	i_generate_data_key,
	i_bd_name,
	i_value,
} from '~types'
import { paths, delimiters } from '~config'
import { mk_file, read_dir, read_file } from '~fs'
import { Path } from '~utils'

//
//
//

export class BD implements i_value<string[]> {
	readonly value

	constructor(
		private name: i_bd_name,
		private key: i_generate_data_key,
		private generate_data: i_generate_data[]
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
			.map((g) => g[this.key])
			.filter(Boolean)
			.join(delimiters.data)
	}
}

//
//
//

export class all_BDs_data implements i_value<string[]> {
	readonly value

	constructor() {
		this.value = read_dir(paths.dir.bd)
			.map((p) => read_file(new Path(paths.dir.bd, p).value))
			.map((d) => d.split(delimiters.data))
			.flat()
			.filter(Boolean)
	}
}
