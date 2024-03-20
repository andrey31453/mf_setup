import { Nullable } from './utils'

export type _dir = Nullable<string>

export interface _file_manifest_data {
  [key: string]: string
}

export interface _aliases {
  [key: string]: string
}

export interface _scripts {
  [key: string]: string
}

export type _file_manifest = Partial<{
  name: string
  version: string
  main: string
  repository: string
  npm: boolean
  module_path: string
  rate: number
  react: boolean
  builder: boolean
  setup: boolean
  arora: boolean
  node: boolean
  compose: boolean
  fsd: boolean
  semantic: boolean
  webpack: boolean
  exposes: _file_manifest_data
  remotes: _file_manifest_data
  shared: string[]
  services: 'all' | string[]
  excludes: string[]
  includes: string[]
  not_gitignore: string[]
  aliases: _aliases
  src: string
  scripts: _scripts
  default_scripts: boolean
}>

export interface _domens {
  dev: string
  prod: string
}

interface _versions {
  manifest: string
  bd: string
  package: string
}

export interface _calculate_manifest {
  path: string
  port: number
  domens: _domens
  versions: _versions
}

export interface _manifest extends _file_manifest, _calculate_manifest {}

export interface _npm_updates {
  name: string
  version: string
}

export interface _uri {
  [key: string]: number
}

export interface _m_env {
  host_port: number
  domens: _domens
}

type __parse__<T> = T[]

export type _parse = __parse__<string>

export type _parse_all = __parse__<string[]>
