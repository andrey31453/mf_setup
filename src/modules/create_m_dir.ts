import { i_value, i_manifest, i_create_m_dir, i_generate } from '~types'
import { mk_dir, is_dir } from '~fs'
import { Path } from '~utils'
import { Is_Need } from './is_need'

//
//
//

export class Create_M_Dir implements i_create_m_dir {
	constructor(
		private manifests: i_value<i_manifest[]>,
		private generate: i_generate
	) {}

	private mk_dir = (dir: string) => {
		this.generate.add({ dir })
		mk_dir(dir)
	}

	private working_dir = (m: i_manifest, dir_name: string) => {
		const dir = new Path(m.path, dir_name).value

		if (!new Is_Need(m, dir_name).value) return
		if (is_dir(dir)) return

		this.mk_dir(dir)
	}

	create = (dir_name: string) => {
		this.manifests.value.forEach((m) => this.working_dir(m, dir_name))
	}
}
