import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { generates } from '~generates'
import { paths } from '~config'

bootstrap(() =>
  setup({
    bd_name: 'init',
    generates: generates.init,
    copy: paths.dir.copy_to_m,
  })
)
