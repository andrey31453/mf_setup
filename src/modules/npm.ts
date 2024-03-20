import {
  _file_manifest,
  _npm_manifest,
  _value,
  _npm_update_versions,
} from '~types'

import {
  File_Manifests,
  Manifest_Path,
  BD_Version,
  Package_Version,
} from './utils'

//
//
//

class NPM_File_Manifests implements _value<_file_manifest[]> {
  readonly value

  constructor() {
    const file_manifests = new File_Manifests().value
    this.value = file_manifests.filter((m) => m.npm)
  }
}

//
//
//

class NPM_Manifests implements _value<_npm_manifest[]> {
  readonly value

  constructor(npm_file_manifests: _file_manifest[]) {
    this.value = npm_file_manifests.map(this.npm_manifest)
  }

  npm_manifest = (m: _file_manifest) => {
    const path = new Manifest_Path(m).value

    return {
      ...m,
      bd_version: new BD_Version(path).value,
      package_version: new Package_Version(path).value,
    }
  }
}

//
//
//

class Not_Sync_Versions implements _value<_npm_update_versions[]> {
  readonly value

  constructor(npm_manifests: _npm_manifest[]) {
    this.value = npm_manifests
      .map((m) =>
        m.package_version === m.bd_version
          ? null
          : {
              name: m.name,
              version: m.package_version,
            }
      )
      .filter(Boolean)
  }
}

//
//
//

export class NPM_Update_Versions implements _value<_npm_update_versions[]> {
  readonly value

  constructor() {
    const npm_file_manifests = new NPM_File_Manifests().value
    const npm_manifests = new NPM_Manifests(npm_file_manifests).value

    this.value = new Not_Sync_Versions(npm_manifests).value
  }
}
