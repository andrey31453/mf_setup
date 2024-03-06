import { _format } from '~types'
import { BDs } from '~bd'
import { execSync } from 'child_process'

export class Format implements _format {
	constructor() {}

	format = () => {
		const generate_files = new BDs().get()

		// TODO delete filtered
		const filtered_files = generate_files
			.filter((s) => !/.yml/.test(s))
			.filter((s) => !/.sh/.test(s))
			.filter((s) => !/.dockerfile/.test(s))
			.filter((s) => !/.eslintrc/.test(s))
			.filter((s) => !/.prettierignore/.test(s))
			.filter((s) => !/.gitignore/.test(s))
			.join(' ')
		execSync(
			`npx prettier ${filtered_files} --write --ignore-path ./.prettierignore`,
			{ stdio: 'inherit' }
		)
	}
}
