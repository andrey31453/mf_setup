import { _parse_all, _parse, _value } from '~types'

//
//
//

class __Parse__<T> implements _value<T> {
  readonly value

  constructor(data: string, keys: string[], parse: Function) {
    this.value = keys.reduce(
      // @ts-ignore
      (parse_data, key: string) => [...parse_data, parse(data, key)],
      []
    ) as unknown as T
  }
}

//
//
//

export class Parse implements _value<_parse> {
  readonly value

  constructor(data: string, keys: string[]) {
    this.value = new __Parse__<_parse>(data, keys, this.parse).value
  }

  private parse = (data: string, key: string) =>
    data.match(new RegExp(key))?.[1]
}

//
//
//

export class Parse_All implements _value<_parse_all> {
  readonly value

  constructor(data: string, keys: string[]) {
    this.value = new __Parse__<_parse_all>(data, keys, this.parse).value
  }

  private parse = (data: string, key: string) => {
    const match_all = [...data.matchAll(new RegExp(key, 'gi'))]
    return match_all.map((m) => m[1])
  }
}
