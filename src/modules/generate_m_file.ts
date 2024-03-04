import {
	i_value,
	i_manifest,
	i_generate_m_dir,
	i_file_data_creator,
	i_data_creator,
	i_generate,
} from '~types'
import { Create_M } from './create_m'

//
//
//

export class Generate_M_File extends Create_M implements i_generate_m_dir {
	constructor(private manifests: i_value<i_manifest[]>, generate: i_generate) {
		super(manifests, generate)
	}

	private generate_file = (file_name: string, data_creator: i_data_creator) =>
		this.create_file(
			(file_name: string, m: i_manifest) =>
				data_creator.create(file_name, m, this.manifests.value),
			file_name
		)

	generate(file_data_creators: i_file_data_creator[]): i_generate_m_dir {
		file_data_creators.forEach(
			({ data_creator, file_name }: i_file_data_creator) =>
				this.generate_file(file_name, data_creator)
		)

		return this
	}
}
