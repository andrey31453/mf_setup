import { _value, _file_manifest } from '~types'
import { packages } from '~config'

//
//
//

export class Config_Version implements _value<string> {
  readonly value

  constructor(file_manifest: _file_manifest) {
    this.value =
      packages.arora[file_manifest.name as keyof typeof packages.arora]
  }
}
