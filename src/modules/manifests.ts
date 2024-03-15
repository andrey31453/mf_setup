import { read_file } from '~fs'
import { paths as p, home_dir, configures } from '~config'
import {
  _file_manifest,
  _manifest,
  _value,
  _m_env,
  _calculate_manifest,
} from '~types'
import { Search_Files } from '~utils'
import { d, sort, add_key } from '~decorators'

//
//
//

class Configure implements _value<_file_manifest> {
  readonly value

  constructor(m: _file_manifest) {
    this.value = configures.find((c) => c.is(m))?.configure
  }
}

//
//
//

class Default_Manifest implements _value<_file_manifest> {
  readonly value

  constructor(m: _file_manifest) {
    const configure = new Configure(m).value
    this.value = Object.keys(configure).reduce(
      // @ts-ignore
      (acc, key: keyof _file_manifest) => ({
        ...acc,
        [key]: m[key] ?? configure[key],
      }),
      {}
    )
  }
}

//
//
//

class File_Manifests implements _value<_file_manifest[]> {
  readonly value: _file_manifest[] = []

  constructor(paths: string[]) {
    this.value = paths.map(this.create_manifest)
  }

  @d(add_key('module_path'))
  private create_manifest(module_path: string): _file_manifest {
    return read_file(module_path, 'json') as unknown as _file_manifest
  }
}

//
//
//

class With_Default implements _value<_file_manifest[]> {
  readonly value

  constructor(paths: string[]) {
    const file_manifests = new File_Manifests(paths).value
    this.value = this.with_default(file_manifests)
  }

  @d(sort('rate', 'desc'))
  private with_default(manifests: _file_manifest[]): _file_manifest[] {
    return manifests.reduce(
      (data, manifest) => [
        ...data,
        {
          ...new Default_Manifest(manifest).value,
          ...manifest,
        },
      ],
      [] as _manifest[]
    )
  }
}

//
//
//

class Calculate_Manifest implements _value<_calculate_manifest> {
  readonly value

  constructor(manifest: _file_manifest, env: _m_env, current_position: number) {
    this.value = {
      path: manifest.module_path?.replace(
        new RegExp(`/${p.file.manifest}`),
        ''
      ),
      port: +env.host_port + current_position,
      domens: env.domens,
    }
  }
}

//
//
//

class With_Calculate implements _value<_manifest[]> {
  readonly value

  constructor(with_default: _file_manifest[], env: _m_env) {
    this.value = this.with_calculate(with_default, env)
  }

  private with_calculate = (
    with_default: _file_manifest[],
    env: _m_env
  ): _manifest[] =>
    with_default.reduce(
      (manifests, manifest, i) => [
        ...manifests,
        {
          ...manifest,
          ...new Calculate_Manifest(manifest, env, i).value,
        },
      ],
      [] as _manifest[]
    )
}

//
//
//

export class Manifests implements _value<_manifest[]> {
  readonly value: _manifest[] = []

  constructor(m_env: _value<_m_env>) {
    const manifest_paths: string[] = new Search_Files(home_dir, p.file.manifest)
      .value
    const with_default = new With_Default(manifest_paths).value

    this.value = new With_Calculate(with_default, m_env.value).value
  }
}
