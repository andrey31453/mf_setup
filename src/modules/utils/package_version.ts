import { read_file } from '~fs'
import { paths as p } from '~config'
import { _value } from '~types'
import { Path, Parse } from '~utils'

//
//
//

export class Package_Version implements _value<string> {
  readonly value

  constructor(path: string) {
    this.value = new Parse(read_file(new Path(path, p.file.package).value), [
      '"version": "(.*)",',
    ]).value[0]
  }
}
