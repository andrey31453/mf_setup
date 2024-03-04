import * as fs from 'fs'
import { is } from './is'

export const is_file = (path: string): boolean => {
	return is(path) && fs.lstatSync(path).isFile()
}
