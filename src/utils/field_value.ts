import { i_value, i_nullable_data } from '~types'
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
import { deep_merge } from './deep_merge'
import { is_mergeable } from './type'

//
//
//

class __Union_Values implements i_value<i_nullable_data> {
	readonly value

	constructor({ value, values }: i_feild_value_params) {
		this.value = value || this.values(values)
	}

	private values = (values: i_nullable_data[]) =>
		this.merged_values(this.formated_values(this.filtered_values(values)))

	private filtered_values = (values: i_nullable_data[]): i_nullable_data[] =>
		values?.filter(Boolean)

	private formated_values = (
		filtered_values: i_nullable_data[]
	): i_nullable_data[] => {
		if (!filtered_values) return null
		if (!filtered_values.length) return null

		return filtered_values
	}

	private merged_values = (
		formated_values: i_nullable_data[]
	): i_nullable_data[] => {
		if (!is_mergeable(formated_values)) return formated_values

		// @ts-ignore
		return deep_merge(...formated_values)
	}
}

//
//
//

interface i_feild_value_params {
	field: string
	value?: i_nullable_data
	values?: i_nullable_data[]
	iterator: Function
	quotes?: keyof typeof quotes
}

export class Field_Value implements i_value<string> {
	readonly value
	private readonly quotes

	constructor(params: i_feild_value_params) {
		params.value = new __Union_Values(params).value

		this.quotes = quotes[params.quotes] ?? quotes.double
		this.value = this.working(params)
	}

	private working(params: i_feild_value_params): string {
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
	private field_value(value: i_nullable_data, cb: Function): string {
		return iterator(value, cb).join(',\n')
	}
}
