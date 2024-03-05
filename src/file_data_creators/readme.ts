import { _manifest, _data_creator } from '~types'

//
//
//

export class Readme implements _data_creator {
	constructor() {}

	create = (
		fn: string,
		manifest: _manifest
	): string => `## microfrontend ${manifest.name}

## git

\`git clone --recurse-submodules https://github.com/andrey31453/mf_builder.git\`

## soft

- node
- docker

## install

1. chmod +x setup.sh
2. ./setup.sh
3. ./dev.sh

## запрет

1. нельзя использовать в локал вебкап конфиге плагины которые уже есть в темплейт или генерейт

## settings

- выкладка идет в дист
- срс папка срс
- из статик идет перенос файлов в ассетс
- из тумплейт идет перенос файлов в корень
		`
}
