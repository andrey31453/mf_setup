import { _format } from '~types'
import { all_BDs_data } from '~bd'
import { execSync } from 'child_process'

export class Format implements _format {
	constructor() {}

	format = () => {
		const generate_files = new all_BDs_data().value

		// TODO delete filtered
		const filtered_files = generate_files
			.filter((s) => !/.yml/.test(s))
			.filter((s) => !/.sh/.test(s))
			.filter((s) => !/.dockerfile/.test(s))
			.filter((s) => !/.eslintrc/.test(s))
			.filter((s) => !/.prettierignore/.test(s))
			.join(' ')
		execSync(
			`npx prettier ${filtered_files} --write --ignore-path ./.prettierignore`,
			{ stdio: 'inherit' }
		)
	}
}
