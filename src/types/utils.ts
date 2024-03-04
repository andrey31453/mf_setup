export type Nullable<T> = T | null | undefined

export interface i_value<T> {
	readonly value: T
}

export type i_nullable_data = Nullable<
	| any[]
	| {
			[key: string]: any
	  }
>
