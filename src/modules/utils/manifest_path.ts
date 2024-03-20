import { paths as p } from '~config'
import { _file_manifest, _value } from '~types'

//
//
//

export class Manifest_Path implements _value<string> {
  readonly value

  constructor(file_manifest: _file_manifest) {
    this.value = file_manifest.module_path?.replace(
      new RegExp(`/${p.file.manifest}`),
      ''
    )
  }
}
