const get_tabs = (count: number) =>
  [...Array(count).values()].reduce((tabs) => tabs + '  ', '\n')

export const tab_before =
  (count: number) =>
  (val: string): string =>
    get_tabs(count) + val

export const tab_after =
  (count: number) =>
  (val: string): string =>
    val + get_tabs(count)
