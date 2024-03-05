import { Nullable } from './utils'

export type i_dir = Nullable<string>

export interface i_file_manifest_data {
	[key: string]: string
}

export interface i_aliases {
	[key: string]: string
}

export interface i_scripts {
	[key: string]: string
}

interface __i_file_manifest {
	name: string
	react: boolean
	npm: boolean
	fsd: boolean
	webpack: boolean
	exposes: i_file_manifest_data
	remotes: i_file_manifest_data
	shared: string[]
	services: 'all' | string[]
	excludes: string[]
	includes: string[]
	aliases: i_aliases
	src: string
	dependencies: string[]
	dev_dependencies: string[]
	scripts: i_scripts
	default_scripts: boolean
}

export type i_file_manifest = Partial<__i_file_manifest>

export interface i_domens {
	dev: string
	prod: string
}

export interface i_manifest extends i_file_manifest {
	path: string
	port: number
	domens: i_domens
}

export interface i_uri {
	[key: string]: number
}

export interface i_m_env {
	host_port: number
	domens: i_domens
}

type __i_parse__<T> = T[]

export type i_parse = __i_parse__<string>

export type i_parse_all = __i_parse__<string[]>
