import { not } from './not'
import { rm_dir_not_save } from './rm_dir'
import { rm_file_not_save } from './rm_file'
import { is_file } from './is_file'

export const rm = (path: string) => {
	if (not(path)) return

	is_file(path) ? rm_file_not_save(path) : rm_dir_not_save(path)
}
