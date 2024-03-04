import * as fs from 'fs'

export const is = (path: string): boolean => {
	return fs.existsSync(path)
}
