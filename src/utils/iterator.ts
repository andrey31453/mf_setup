import { _nullable_data } from '~types'
import { is_array, is_nullable, is_object } from './type'

//
//
//

interface _iterator {
  is: ((data: _nullable_data) => boolean)[]
  iterator: (value: _nullable_data, cb: Function) => any[]
}

const object_iterator = (data: {}, cb: Function): any[] =>
  // @ts-ignore
  Object.keys(data).map((key: string) => cb(data[key], key))

const nullable_iterator = (): any[] => ['']

const iterators: _iterator[] = [
  {
    is: [is_object, is_array],
    // @ts-ignore
    iterator: object_iterator,
  },
  {
    is: [is_nullable],
    iterator: nullable_iterator,
  },
]

//
//
//

export const iterator = (data: _nullable_data, cb: Function) =>
  // @ts-ignore
  iterators
    .find((iterator) => iterator.is.map((i) => i(data)).includes(true))
    .iterator(data, cb)
