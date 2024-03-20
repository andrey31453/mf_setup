import { bootstrap } from './bootstrap'
import { NPM_Update_Versions } from '~modules'
import { NPM_Install_To_Docker_CMD, exec } from '~utils'

const update = () => {
  const update_versions = new NPM_Update_Versions().value
  if (!update_versions.length) return

  exec(new NPM_Install_To_Docker_CMD(update_versions).value)
}

bootstrap(update)
