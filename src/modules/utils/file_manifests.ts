import { read_file } from '~fs'
import { paths as p, home_dir } from '~config'
import { _file_manifest, _value } from '~types'
import { Search_Files } from '~utils'
import { d, add_key, validate_npm } from '~decorators'

//
//
//

export class File_Manifests implements _value<_file_manifest[]> {
  readonly value

  constructor() {
    const paths = new Search_Files(home_dir, p.file.manifest).value
    this.value = paths.map(this.create_manifest)
  }

  @d(validate_npm)
  @d(add_key('module_path'))
  private create_manifest(module_path: string): _file_manifest {
    return read_file(module_path, 'json') as unknown as _file_manifest
  }
}
