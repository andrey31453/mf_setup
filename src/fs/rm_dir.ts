import * as fs from 'fs'
import { is } from './is'

const __rm_dir = (path: string) =>
	fs.rmSync(path, {
		recursive: true,
		force: true,
	})

export const rm_dir_not_save = (path: string) => __rm_dir(path)

export const rm_dir = (path: string) => is(path) && __rm_dir(path)
