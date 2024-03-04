import * as fs from 'fs'
import { is } from './is'

const __rm_file = (path: string) =>
	fs.rmSync(path, {
		force: true,
	})

export const rm_file_not_save = (path: string) => __rm_file(path)

export const rm_file = (path: string) => is(path) && __rm_file(path)
