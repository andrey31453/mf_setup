import * as fs from 'fs'

export const mk_file = (file_path: string, file_data: string): void =>
	fs.writeFileSync(file_path, file_data)
