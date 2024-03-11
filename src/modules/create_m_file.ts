import { _create_m_file, _manifest, _value, _dir, _generate } from '~types'
import { mk_file } from '~fs'
import { With_Comment, Path } from '~utils'
import { Not_Need_M } from '~modules'

//
//
//

export class Create_M_File implements _create_m_file {
  constructor(
    private manifests: _value<_manifest[]>,
    private generate: _generate
  ) {}

  private files_data = (path: string, create_data_method: Function): string[] =>
    this.manifests.value.map((md) =>
      create_data_method(path.match(/[^/]*$/)?.[0], md)
    )

  private create_file_in_m = (
    file_data: string,
    m_path: string,
    m: _manifest
  ) => {
    if (!file_data) return
    if (new Not_Need_M(m_path, m).value) return

    // TODO rewrite for path in params
    const path = new Path(m.path, m_path).value
    this.generate.add(m, path)
    mk_file(path, new With_Comment(file_data, path).value)
  }

  private create_files_in_m = (files_data: string[], path: string) => {
    files_data.forEach((file_data, i) =>
      this.create_file_in_m(file_data, path, this.manifests.value[i])
    )
  }

  create = (create_data_method: Function, path: string) =>
    this.create_files_in_m(this.files_data(path, create_data_method), path)
}
