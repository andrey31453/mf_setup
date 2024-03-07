import { _value, _manifest, _create_m_dir, _generate } from '~types'
import { mk_dir, is_dir } from '~fs'
import { Path, Is_Need } from '~utils'

//
//
//

export class Create_M_Dir implements _create_m_dir {
	constructor(
		private manifests: _value<_manifest[]>,
		private generate: _generate
	) {}

	private mk_dir = (m: _manifest, dir: string) => {
		this.generate.add(m, dir)
		mk_dir(dir)
	}

	private working_dir = (m: _manifest, dir_name: string) => {
		const dir = new Path(m.path, dir_name).value

		if (!new Is_Need(dir_name, m).value) return
		if (is_dir(dir)) return

		this.mk_dir(m, dir)
	}

	create = (dir_name: string) => {
		this.manifests.value.forEach((m) => this.working_dir(m, dir_name))
	}
}
