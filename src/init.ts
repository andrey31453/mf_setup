import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { generates } from '~generates'
import { paths } from '~config'
import { _bd_name } from '~types'

bootstrap(() =>
  setup({
    bd_name: _bd_name.init,
    generates: generates.init,
    copy: paths.dir.copy_to_m,
  })
)
