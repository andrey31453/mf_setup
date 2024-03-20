import { read_file } from '~fs'
import { paths as p } from '~config'
import { _value } from '~types'
import { Path } from '~utils'

//
//
//

export class BD_Version implements _value<string> {
  readonly value

  constructor(path: string) {
    this.value = read_file(new Path(path, p.file.version).value)
  }
}
