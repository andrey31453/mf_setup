import { _value, _nullable_data } from '~types'
import { quotes } from '~config'
import {
  d,
  comma_after,
  tab_after,
  object_brackets,
  delete_last_comma,
  tab_before,
} from '~decorators'
import { iterator } from './iterator'
import { merge } from './merge'
import { is_mergeable } from './type'

//
//
//

interface _feild_value_params {
  field: string
  value?: _nullable_data
  values?: _nullable_data[]
  iterator: Function
  quotes?: keyof typeof quotes
}

//
//
//

class __Union_Values implements _value<_nullable_data> {
  readonly value

  constructor({ value, values }: _feild_value_params) {
    // @ts-ignore
    this.value = value || this.values(values)
  }

  private values = (values: _nullable_data[]) =>
    this.merged_values(this.formated_values(this.filtered_values(values)))

  private filtered_values = (values: _nullable_data[]): _nullable_data[] =>
    values?.filter(Boolean)

  private formated_values = (
    filtered_values: _nullable_data[]
  ): _nullable_data[] | null => {
    if (!filtered_values) return null
    if (!filtered_values.length) return null

    return filtered_values
  }

  private merged_values = (
    formated_values: _nullable_data[] | null
  ): _nullable_data[] | null => {
    if (!is_mergeable(formated_values)) return formated_values

    // @ts-ignore
    return merge(...formated_values)
  }
}

//
//
//

export class Field_Value implements _value<string> {
  readonly value
  private readonly quotes

  constructor(params: _feild_value_params) {
    params.value = new __Union_Values(params).value

    this.quotes = params.quotes ? quotes[params.quotes] : quotes.double
    this.value = this.working(params)
  }

  private working(params: _feild_value_params): string {
    if (!params.value) return ''

    return this.field(
      params.field,
      this.field_value(params.value, params.iterator)
    )
  }

  @d(comma_after)
  private field(fileld: string, value: string): string {
    return `${this.quotes}${fileld}${this.quotes}: ${value}`
  }

  @d(object_brackets)
  @d(delete_last_comma)
  @d(tab_before(0))
  @d(tab_after(0))
  private field_value(value: _nullable_data, cb: Function): string {
    return iterator(value, cb).join(',\n')
  }
}
