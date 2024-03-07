export const add_key =
  (key: string) =>
  <T extends { [key: string]: any }>(value: T, input: string): T => ({
    ...value,
    ...{
      [key]: input,
    },
  })
