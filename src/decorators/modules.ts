import { _file_manifest } from '~types'
import { npm_required_keys, packages } from '~config'

//
//
//

export const add_key =
  (key: string) =>
  <T extends { [key: string]: any }>(value: T, input: string): T => ({
    ...value,
    ...{
      [key]: input,
    },
  })

//
//
//

const has_npm_required_keys = (m: _file_manifest): boolean =>
  !npm_required_keys.reduce((not_valid, key) => not_valid || !m[key], false)

const correct_package_name = (m: _file_manifest): boolean =>
  Object.keys(packages.arora).includes(m.name as string)

const not_valid = (m: _file_manifest): boolean =>
  !has_npm_required_keys(m) || !correct_package_name(m)

export const validate_npm = (m: _file_manifest) => {
  if (!m.npm) return m

  if (not_valid(m))
    throw new Error(
      `don't correct manifest from path: ${m.module_path} with name: ${m.name}`
    )
  return m
}
