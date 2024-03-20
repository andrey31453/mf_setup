import { bootstrap } from './bootstrap'
import { NPM, Generate_M_File } from '~modules'
import { Generate } from '~bd'
import { NPM_Install_To_Docker_CMD, exec } from '~utils'
import { Manifests, M_Env } from '~modules'
import { _bd_name } from '~types'
import { generates } from '~generates'

const update = () => {
  const npm = new NPM(new Manifests(new M_Env()))

  console.log('npm.updates: ', npm.updates)

  if (!npm.updates.length) return

  exec(new NPM_Install_To_Docker_CMD(npm.updates).value)

  new Generate_M_File(npm.manifests, new Generate(_bd_name.update)).generate(
    generates.update
  )
}

bootstrap(update)
