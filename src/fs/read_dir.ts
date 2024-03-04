import * as fs from 'fs'
import { is } from './is'

export const read_dir = (path: string): string[] =>
	is(path) ? fs.readdirSync(path) : ['']
