export type Nullable<T> = T | null | undefined

export interface _value<T> {
  readonly value: T
}

export type _nullable_data = Nullable<
  | any[]
  | {
      [key: string]: any
    }
>
