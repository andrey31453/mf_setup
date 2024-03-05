import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { init_files } from '~file_data_creators'
import { paths } from '~config'

bootstrap(() =>
	setup({
		bd_name: 'init',
		generates: init_files,
		copy: paths.dir.copy_to_m,
	})
)

// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')

// const path = 'init.not_gitignore'
// const test = 'not_gitignore'
// console.log(new RegExp('\\.\\*' + path).test(test))
// console.log(/init.not_gitignore/.test(test))

// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
// console.log('---- ---- ---- ----')
