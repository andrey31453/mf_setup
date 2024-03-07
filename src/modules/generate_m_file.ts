import {
	_value,
	_manifest,
	_generate_m_file,
	_file_data_creator,
	_data_creator,
	_generate,
} from '~types'
import { Create_M } from './create_m'

//
//
//

export class Generate_M_File extends Create_M implements _generate_m_file {
	constructor(
		private manifests: _value<_manifest[]>,
		generate: _generate
	) {
		super(manifests, generate)
	}

	private generate_file = (file_name: string, data_creator: _data_creator) =>
		this.create_file(
			(file_name: string, m: _manifest) =>
				data_creator.create_data(file_name, m, this.manifests.value),
			file_name
		)

	generate(file_data_creators: _file_data_creator[]): _generate_m_file {
		file_data_creators.forEach(
			({ data_creator, file_name }: _file_data_creator) =>
				this.generate_file(file_name, data_creator)
		)

		return this
	}
}
