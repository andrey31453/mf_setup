import {
	_value,
	_manifest,
	_create_m,
	_generate,
	_create_m_file,
	_create_m_dir,
} from '~types'
import { Create_M_File } from './create_m_file'
import { Create_M_Dir } from './create_m_dir'

//
//
//

export class Create_M implements _create_m {
	private create_m_file: _create_m_file
	private create_m_dir: _create_m_dir

	constructor(manifests: _value<_manifest[]>, generate: _generate) {
		this.create_m_file = new Create_M_File(manifests, generate)
		this.create_m_dir = new Create_M_Dir(manifests, generate)
	}

	create_dir = (dir_name: string) => this.create_m_dir.create(dir_name)

	create_file = (create_data_method: Function, path: string) =>
		this.create_m_file.create(create_data_method, path)
}
