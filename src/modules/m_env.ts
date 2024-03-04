import { i_value, i_m_env } from '~types'
import { Parse, Path } from '~utils'
import { paths, home_dir } from '~config'
import { read_file } from '~fs'

//
//
//

export class M_Env implements i_value<i_m_env> {
	readonly value

	constructor() {
		const env_data = read_file(new Path(home_dir, paths.file.env).value)
		const [port, dev_domen, prod_domen] = new Parse(env_data, [
			'port: (.*)',
			'dev_domen: (.*)',
			'prod_domen: (.*)',
		]).value

		this.value = {
			host_port: +port,
			domens: {
				dev: dev_domen,
				prod: prod_domen,
			},
		}
	}
}
