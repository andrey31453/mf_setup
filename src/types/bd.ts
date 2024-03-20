import { _manifest } from './data'

export type _generate_data = string

export type _generate = {
  value: _generate_data[]
  add: (m: _manifest, data: _generate_data) => void
  set: () => void
}

export enum _bd_name {
  init = 'init',
  update = 'update',
  preset = 'preset',
}

export interface _bd {
  set(generate_data: _generate_data[]): void
  get(): _generate_data[]
}

export interface _bds {
  get(): _generate_data[]
}
