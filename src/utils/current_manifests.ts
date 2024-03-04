import { i_value, i_manifest } from '~types'

//
//
//

export class Current_Manifest implements i_value<i_manifest> {
	readonly value

	constructor(manifests: i_manifest[], module_name: string) {
		this.value = manifests.find((manifest) => manifest.name === module_name)
	}
}
