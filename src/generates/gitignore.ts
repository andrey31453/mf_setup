import { _manifest, _data_creator, _value } from '~types'
import { paths, not_gitignore } from '~config'
import { BDs } from '~bd'
import { Is_Need } from '../utils/need'

//
//
//

class Generates implements _value<string> {
  readonly value
  constructor(m: _manifest, bds_data: string[]) {
    this.value = bds_data
      .filter(
        (path) =>
          // TODO @ts-ignore
          // @ts-ignore
          new Is_Need(path, null, [...not_gitignore, ...m.not_gitignore]).value
      )
      .filter((path) => new RegExp(m.path).test(path))
      .map((path) => path.replace(new RegExp(m.path + '/'), ''))
      .join('\n')
  }
}

//
//
//

export class Gitignore implements _data_creator {
  constructor() {}

  create_data = (file_name: string, m: _manifest): string => `package-lock.json
node_modules

# mac
/**/*.DS_Store

# compiled output
/**/dist

# logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# ide-s
/.idea
.project
.classpath
.c9/
*.launch
*.sublime-workspace
/.vscode

# generate
${paths.dir.bd}
${new Generates(m, new BDs().get()).value}`
}
