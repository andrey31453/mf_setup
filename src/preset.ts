import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { preset_files } from '~file_data_creators'

bootstrap(() =>
  setup({
    bd_name: 'preset',
    generates: preset_files,
    not_gitignore: true,
  })
)
