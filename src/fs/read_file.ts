import * as fs from 'fs'
import { is } from './is'

const read_text = (path: string): string =>
	fs.readFileSync(path, 'utf8').toString()

const read_json = (path: string): string =>
	JSON.parse(fs.readFileSync(path, 'utf8'))

const read_methods = {
	json: read_json,
	text: read_text,
}

export const read_file = (
	path: string,
	method: 'json' | 'text' = 'text'
): string => (is(path) ? read_methods[method](path) : '')
