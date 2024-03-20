import { _value, _npm_updates } from '~types'

//
//
//

export class NPM_Install_To_Docker_CMD implements _value<string> {
  readonly value

  constructor(private update_versions: _npm_updates[]) {
    this.value = `for i in \`docker ps -q -a\`; do docker exec -it $i npm i ${this.cmd}; done`
  }

  get cmd(): string {
    return this.update_versions
      .reduce((cmd, v) => `${cmd} ${v.name}@${v.version}`, '')
      .trim()
  }
}
