import { _manifest } from './data'

export type _generate_data = string

export interface _generate {
  value: _generate_data[]
  add: (m: _manifest, data: _generate_data) => void
  set: () => void
}

export type _bd_name = 'init' | 'update' | 'preset'

export interface _bd {
  set(generate_data: _generate_data[]): void
  get(): _generate_data[]
}

export interface _bds {
  get(): _generate_data[]
}
