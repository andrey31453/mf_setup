import { _format } from '~types'
import { BDs } from '~bd'
import { exec } from '~utils'

export class Format implements _format {
  constructor() {}

  format = () => {
    const generate_files = new BDs().get()

    // TODO delete filtered
    const filtered_files = generate_files
      .filter((s) => !/.dockerignore/.test(s))
      .filter((s) => !/.version/.test(s))
      .filter((s) => !/.yml/.test(s))
      .filter((s) => !/.sh/.test(s))
      .filter((s) => !/.dockerfile/.test(s))
      .filter((s) => !/.eslintrc/.test(s))
      .filter((s) => !/.prettierignore/.test(s))
      .filter((s) => !/.gitignore/.test(s))
      .join(' ')

    exec(
      `npx prettier ${filtered_files} --write --ignore-path ./.prettierignore`
    )
  }
}
