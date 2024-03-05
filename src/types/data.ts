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

interface ___file_manifest {
	name: string
	react: boolean
	npm: boolean
	fsd: boolean
	webpack: boolean
	exposes: _file_manifest_data
	remotes: _file_manifest_data
	shared: string[]
	services: 'all' | string[]
	excludes: string[]
	includes: string[]
	aliases: _aliases
	src: string
	dependencies: string[]
	dev_dependencies: string[]
	scripts: _scripts
	default_scripts: boolean
}

export type _file_manifest = Partial<___file_manifest>

export interface _domens {
	dev: string
	prod: string
}

export interface _manifest extends _file_manifest {
	path: string
	port: number
	domens: _domens
}

export interface _uri {
	[key: string]: number
}

export interface _m_env {
	host_port: number
	domens: _domens
}

type ___parse__<T> = T[]

export type _parse = ___parse__<string>

export type _parse_all = ___parse__<string[]>
