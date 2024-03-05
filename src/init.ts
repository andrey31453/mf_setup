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
