import { _manifest, _data_creator, _value } from '~types'
import { paths } from '~config'
import { BDs } from '~bd'

//
//
//

class Generates implements _value<string> {
	readonly value
	constructor(bds_data: string[]) {
		this.value = bds_data.join('\n')
	}
}

//
//
//

export class Gitignore implements _data_creator {
	constructor() {}

	create = (file_name: string, m: _manifest): string => `package-lock.json
node_modules

# db
/.db

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
${new Generates(new BDs().get()).value}`
}
