import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { generates } from '~generates'
import { _bd_name } from '~types'

bootstrap(() =>
  setup({
    bd_name: _bd_name.preset,
    generates: generates.preset,
    not_gitignore: true,
  })
)
