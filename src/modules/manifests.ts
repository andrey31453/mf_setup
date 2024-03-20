import { paths as p, configures, packages } from '~config'
import {
  _file_manifest,
  _manifest,
  _value,
  _m_env,
  _calculate_manifest,
} from '~types'
import { d, sort } from '~decorators'

import {
  File_Manifests,
  Manifest_Path,
  BD_Version,
  Arora_Version,
  Package_Version,
} from './utils'

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

class With_Defaults implements _value<_file_manifest[]> {
  readonly value

  constructor(file_manifests: _file_manifest[]) {
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

class Manifest_Version implements _value<string> {
  readonly value

  constructor(file_manifest: _file_manifest, path: string) {
    this.value =
      new BD_Version(path).value ||
      file_manifest.version ||
      new Arora_Version(file_manifest).value ||
      '0.0.1'
  }
}

//
//
//

class Calculate_Manifest implements _value<_calculate_manifest> {
  readonly value

  constructor(
    file_manifest: _file_manifest,
    env: _m_env,
    current_position: number
  ) {
    const path = new Manifest_Path(file_manifest).value

    this.value = {
      path,
      port: +env.host_port + current_position,
      domens: env.domens,
      versions: {
        manifest: new Manifest_Version(file_manifest, path).value,
        bd: new BD_Version(path).value,
        package: new Package_Version(path).value,
      },
    }
  }
}

//
//
//

class With_Calculates implements _value<_manifest[]> {
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
  readonly value

  constructor(m_env: _value<_m_env>) {
    const file_manifests = new File_Manifests().value
    const with_defaults = new With_Defaults(file_manifests).value
    this.value = new With_Calculates(with_defaults, m_env.value).value
  }
}
