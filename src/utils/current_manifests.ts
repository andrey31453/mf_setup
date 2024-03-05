import { _value, _manifest } from '~types'

//
//
//

export class Current_Manifest implements _value<_manifest> {
	readonly value

	constructor(manifests: _manifest[], module_name: string) {
		this.value = manifests.find((manifest) => manifest.name === module_name)
	}
}
