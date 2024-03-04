import { read_file } from '~fs'
import { paths as p, home_dir } from '~config'
import { i_file_manifest, i_manifest, i_value, i_m_env } from '~types'
import { Search_Files } from '~utils'

//
//
//

class File_Manifests implements i_value<i_file_manifest[]> {
	readonly value: i_file_manifest[] = []

	constructor(paths: string[]) {
		this.value = paths.map(this.create_manifest)
	}

	private create_manifest = (module_path: string): i_file_manifest =>
		read_file(module_path, 'json') as unknown as i_file_manifest
}

//
//
//

class Default_Manifest implements i_value<i_file_manifest> {
	readonly value
	private readonly default_values: i_file_manifest = {
		react: true,
		fsd: true,
		webpack: true,
		npm: false,
	}

	constructor(manifest: i_file_manifest) {
		this.value = Object.keys(this.default_values).reduce(
			(acc, key: keyof i_file_manifest) => ({
				...acc,
				[key]: manifest[key] ?? this.default_values[key],
			}),
			{}
		)
	}
}

//
//
//

let port_number = 0
class Calculate_Manifest implements i_value<i_manifest> {
	readonly value

	constructor(manifest_path: string, env: i_m_env) {
		this.value = {
			path: manifest_path.replace(new RegExp(`/${p.file.manifest}`), ''),
			port: +env.host_port + port_number++,
			domens: env.domens,
		}
	}
}

//
//
//

export class Manifests implements i_value<i_manifest[]> {
	readonly value: i_manifest[] = []

	constructor(m_env: i_value<i_m_env>) {
		const manifest_paths: i_value<string[]> = new Search_Files(
			home_dir,
			p.file.manifest
		)
		const manifests: i_value<i_file_manifest[]> = new File_Manifests(
			manifest_paths.value
		)

		this.value = this.create_data(
			manifest_paths.value,
			manifests.value,
			m_env.value
		)
	}

	private create_data = (
		manifest_paths: string[],
		manifests: i_file_manifest[],
		env: i_m_env
	): i_manifest[] =>
		manifest_paths.reduce(
			(data, manifest_path, i) => [
				...data,
				{
					...new Default_Manifest(manifests[i]).value,
					...new Calculate_Manifest(manifest_path, env).value,
					...manifests[i],
				},
			],
			[] as i_manifest[]
		)
}
