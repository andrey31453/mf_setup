import { _value, Nullable } from '~types'

//
//
//

type _need_data = Nullable<string[] | null>

export class Is_Need implements _value<boolean> {
  readonly value

  constructor(
    path: string,
    includes: _need_data = null,
    excludes: _need_data = null
  ) {
    const need_method = this.need_method(includes, excludes)
    this.value = need_method(path, includes, excludes)
  }

  private need_method = (
    includes: _need_data,
    excludes: _need_data
  ): Function =>
    (includes && this.is_include_file) ||
    (excludes && this.is_exclude_file) ||
    (() => true)

  private is_include_file = (
    path: string,
    includes: _need_data,
    excludes: _need_data
  ): boolean => this.test(path, includes)

  private is_exclude_file = (
    path: string,
    includes: _need_data,
    excludes: _need_data
  ): boolean => !this.test(path, excludes)

  private test = (path: string, data: _need_data) =>
    // @ts-ignore
    data.reduce((test, data_elem) => {
      return test || new RegExp(data_elem).test(path)
    }, false)
}

//
//
//

export class Not_Need implements _value<boolean> {
  readonly value

  constructor(
    path: string,
    includes: _need_data = null,
    excludes: _need_data = null
  ) {
    this.value = !new Is_Need(path, includes, excludes).value
  }
}
