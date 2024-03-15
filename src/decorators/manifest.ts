import { _manifest } from '~types'
import { files } from '~config'
import { Is_Need } from '~utils'

//
//
//

type _decorator_args = [boolean, string, _manifest]

type _check_with_manifest = (
  key: keyof typeof files,
  args: _decorator_args
) => boolean

const __check_with_manifest: _check_with_manifest = (key, args) => {
  const [value, path, m] = args

  if (!value) return value
  if (m[key]) return value

  return new Is_Need(path, null, files[key]).value
}

//
//
//

export const webpack = (...args: _decorator_args) => {
  return __check_with_manifest('webpack', args)
}

export const compose = (...args: _decorator_args) => {
  return __check_with_manifest('compose', args)
}

export const npm = (...args: _decorator_args) => {
  return __check_with_manifest('npm', args)
}

export const builder = (...args: _decorator_args) => {
  return __check_with_manifest('builder', args)
}