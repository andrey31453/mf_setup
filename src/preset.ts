import { setup } from './setup'
import { bootstrap } from './bootstrap'
import { generates } from '~generates'

bootstrap(() =>
  setup({
    bd_name: 'preset',
    generates: generates.preset,
    not_gitignore: true,
  })
)
