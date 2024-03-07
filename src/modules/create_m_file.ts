import {
	_create_m_file,
	_manifest,
	Nullable,
	_value,
	_dir,
	_generate,
} from '~types'
import { mk_file } from '~fs'
import { With_Comment, Path, Is_Need } from '~utils'

//
//
//

type _create_file_params = {
	dir: _dir
	file_name: string
	file_data: string
	m: _manifest
}

export class Create_M_File implements _create_m_file {
	constructor(
		private manifests: _value<_manifest[]>,
		private generate: _generate
	) {}

	private files_data = (
		file_name: string,
		create_data_method: Function
	): string[] =>
		this.manifests.value.map((md) => create_data_method(file_name, md))

	private create_file_in_m = ({
		dir,
		file_name,
		file_data,
		m,
	}: _create_file_params) => {
		if (!file_data) return
		if (!new Is_Need(new Path(dir, file_name).value, m).value) return

		// TODO rewrite for path in params
		const path = new Path(m.path, dir, file_name).value
		this.generate.add(m, path)
		mk_file(path, new With_Comment(file_data, file_name).value)
	}

	private create_files_in_m = (
		files_data: string[],
		file_name: string,
		dir: _dir
	) => {
		files_data.forEach((file_data, i) =>
			this.create_file_in_m({
				dir,
				file_name,
				file_data,
				m: this.manifests.value[i],
			})
		)
	}

	create = (
		create_data_method: Function,
		file_name: string,
		dir: Nullable<string> = null
	) =>
		this.create_files_in_m(
			this.files_data(file_name, create_data_method),
			file_name,
			dir
		)
}
