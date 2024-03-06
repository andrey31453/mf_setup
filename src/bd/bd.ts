import {
	_generate_data,
	_bd_name,
	_is_need__props,
	_value,
	_bd,
	_bds,
} from '~types'
import { paths, delimiters } from '~config'
import { mk_file, read_file, read_dir } from '~fs'
import { Path } from '~utils'

//
//
//

export class BD implements _bd {
	constructor(private name: _bd_name) {}

	set = (generate_data: _generate_data[]) =>
		mk_file(this.file_name, generate_data.filter(Boolean).join(delimiters.bd))

	get = (): _generate_data[] => read_file(this.file_name).split(delimiters.bd)

	private get file_name(): string {
		return new Path(paths.dir.bd, this.name).value
	}
}

//
//
//

export class BDs implements _bds {
	constructor() {}

	get = () =>
		read_dir(paths.dir.bd)
			.map((p) => read_file(new Path(paths.dir.bd, p).value))
			.map((d) => d.split(delimiters.bd))
			.flat()
			.filter(Boolean)
}
