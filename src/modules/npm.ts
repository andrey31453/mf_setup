import { _file_manifest, _value, _npm_updates, _manifest } from '~types'

//
//
//

class NPM_Manifests implements _value<_file_manifest[]> {
  readonly value

  constructor(manifests: _manifest[]) {
    this.value = manifests.filter((m) => m.npm)
  }
}

//
//
//

class NPM_Updates implements _value<_npm_updates[]> {
  readonly value

  constructor(npm_manifests: _manifest[]) {
    this.value = npm_manifests
      .map((m) =>
        m.versions.package === m.versions.bd
          ? null
          : {
              name: m.name,
              version: m.versions.package,
            }
      )
      .filter(Boolean)
  }
}

//
//
//

interface _npm {
  updates: _npm_updates[]
  manifests: _value<_manifest[]>
}

export class NPM implements _npm {
  updates
  manifests

  constructor(manifests: _value<_manifest[]>) {
    this.manifests = new NPM_Manifests(manifests.value)
    this.updates = new NPM_Updates(this.manifests.value).value
  }
}
