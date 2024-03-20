import { _manifest, _data_creator } from '~types'

//
//
//

export class Version implements _data_creator {
  constructor() {}

  create_data = (file_name: string, m: _manifest): string => m.version as string
}
