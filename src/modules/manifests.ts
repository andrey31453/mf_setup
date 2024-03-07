import { read_file } from '~fs'
import { paths as p, home_dir, default_manifest } from '~config'
import {
  _file_manifest,
  _manifest,
  _value,
  _m_env,
  _calculate_manifest,
} from '~types'
import { Search_Files } from '~utils'
import { d, sort } from '~decorators'

//
//
//

class File_Manifests implements _value<_file_manifest[]> {
  readonly value: _file_manifest[] = []

  constructor(paths: string[]) {
    this.value = paths.map(this.create_manifest)
  }

  private create_manifest = (module_path: string): _file_manifest =>
    read_file(module_path, 'json') as unknown as _file_manifest
}

//
//
//

class Default_Manifest implements _value<_file_manifest> {
  readonly value

  constructor(manifest: _file_manifest) {
    this.value = Object.keys(default_manifest).reduce(
      (acc, key: keyof _file_manifest) => ({
        ...acc,
        [key]: manifest[key] ?? default_manifest[key],
      }),
      {}
    )
  }
}

//
//
//

let port_number = 0
class Calculate_Manifest implements _value<_calculate_manifest> {
  readonly value

  constructor(manifest_path: string, env: _m_env) {
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

export class Manifests implements _value<_manifest[]> {
  readonly value: _manifest[] = []

  constructor(m_env: _value<_m_env>) {
    const manifest_paths: _value<string[]> = new Search_Files(
      home_dir,
      p.file.manifest
    )

    const manifest_with_default = this.with_default(
      manifest_paths.value,
      new File_Manifests(manifest_paths.value).value,
      m_env.value
    )

    this.value = this.with_calculate(
      manifest_paths.value,
      manifest_with_default,
      m_env.value
    )
  }

  @d(sort('rate', 'desc'))
  private with_default(
    manifest_paths: string[],
    manifests: _file_manifest[],
    env: _m_env
  ): _file_manifest[] {
    return manifest_paths.reduce(
      (data, manifest_path, i) => [
        ...data,
        {
          ...new Default_Manifest(manifests[i]).value,
          ...manifests[i],
        },
      ],
      [] as _manifest[]
    )
  }

  private with_calculate(
    manifest_paths: string[],
    manifests: _file_manifest[],
    env: _m_env
  ): _manifest[] {
    return manifest_paths.reduce(
      (data, manifest_path, i) => [
        ...data,
        {
          ...new Calculate_Manifest(manifest_path, env).value,
          ...manifests[i],
        },
      ],
      [] as _manifest[]
    )
  }
}
