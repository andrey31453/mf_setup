import { _parse_all, _parse, _value, Falsy } from '~types'

//
//
//

type _input_value = Falsy<any[]>
type _output_value = any[]

export const concat_spread = (...vals: _input_value[]): _output_value =>
  vals.reduce((acc: _output_value, val) => {
    if (!val) return acc

    acc.push(...val)
    return acc
  }, [])
