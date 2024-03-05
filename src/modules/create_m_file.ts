import {
	_create_m_file,
	_manifest,
	Nullable,
	_value,
	_dir,
	_generate,
} from '~types'
import { mk_file } from '~fs'
import { Is_Need } from './is_need'
import { With_Comment, Path } from '~utils'

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

	private file_path = (
		manifests: _manifest,
		file_name: string,
		dir: _dir
	): [string, string] => [
		new Path(manifests.path, dir, file_name).value,
		new Path(dir, file_name).value,
	]

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
		if (!new Is_Need(m, dir, file_name).value) return
		if (!file_data) return

		const [absolute, module] = this.file_path(m, file_name, dir)
		this.generate.add({ absolute, module })
		mk_file(absolute, new With_Comment(file_data, file_name).value)
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
