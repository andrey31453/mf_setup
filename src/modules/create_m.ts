import {
	i_value,
	i_manifest,
	i_create_m,
	i_generate,
	i_create_m_file,
	i_create_m_dir,
	Nullable,
} from '~types'
import { Create_M_File } from './create_m_file'
import { Create_M_Dir } from './create_m_dir'

//
//
//

export class Create_M implements i_create_m {
	private create_m_file: i_create_m_file
	private create_m_dir: i_create_m_dir

	constructor(manifests: i_value<i_manifest[]>, generate: i_generate) {
		this.create_m_file = new Create_M_File(manifests, generate)
		this.create_m_dir = new Create_M_Dir(manifests, generate)
	}

	create_dir = (dir_name: string) => this.create_m_dir.create(dir_name)

	create_file = (
		create_data_method: Function,
		file_name: string,
		dir?: Nullable<string>
	) => this.create_m_file.create(create_data_method, file_name, dir)
}
