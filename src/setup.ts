import { Manifests, Copy_M_Dir, Generate_M_File, M_Env, Format } from '~modules'
import { generates as g } from '~generates'
import { Generate } from '~bd'
import { _setup_params } from '~types'

export const setup = ({
  bd_name,
  generates,
  copy,
  not_gitignore,
}: _setup_params) => {
  const generate = new Generate(bd_name)
  const manifests = new Manifests(new M_Env())

  copy && new Copy_M_Dir(manifests, generate).copy(copy)
  const generate_m_file = new Generate_M_File(manifests, generate)
  generates && generate_m_file.generate(generates)

  generate.set()

  !not_gitignore && generate_m_file.generate(g.gitignore)
  new Format().format()
}
