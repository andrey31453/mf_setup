import { Manifests, Copy_M_Dir, Generate_M_File, M_Env, Format } from '~modules'
import { gitignore_data_creator } from '~file_data_creators'
import { Generate } from '~bd'
import { _setup_params } from '~types'

export const setup = ({ bd_name, generates, copy }: _setup_params) => {
	const generate = new Generate(bd_name)
	const manifests = new Manifests(new M_Env())

	copy && new Copy_M_Dir(manifests, generate).copy(copy)
	const generate_m_file = new Generate_M_File(manifests, generate)
	generates && generate_m_file.generate(generates)

	generate.set()

	generate_m_file.generate([gitignore_data_creator])
	new Format().format()
}
