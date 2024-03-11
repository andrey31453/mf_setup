import { comment_prefix, comments_without_prefix } from '~config'
import { _value } from '~types'

type _file_extension = keyof typeof comment_prefix

//
//
//

class File_Extension implements _value<_file_extension> {
  readonly value

  constructor(file_name: string) {
    this.value = file_name.match(/[^.]*$/g)?.[0] as unknown as _file_extension
  }
}

//
//
//

class Prefix implements _value<string | string[]> {
  readonly value

  constructor(file_extension: _value<_file_extension>) {
    this.value = comment_prefix[file_extension.value] || null
  }
}

//
//
//

class Add_Prefix implements _value<Function> {
  readonly value

  constructor(prefix: _value<string | string[]>) {
    this.value = this.create_add_prefix(prefix.value)
  }

  private create_add_prefix(prefix: string | string[]) {
    if (Array.isArray(prefix))
      return this.add_prefix_and_postfix(prefix[0], prefix[1])

    if (prefix) return this.add_prefix(prefix)

    return () => ''
  }

  private add_prefix_and_postfix =
    (prefix: string, postfix: string) => (comment_without_prefix: string) =>
      `${prefix} ${comment_without_prefix} ${postfix}`

  private add_prefix = (prefix: string) => (comment_without_prefix: string) =>
    `${prefix} ${comment_without_prefix}`
}

//
//
//

class Comment implements _value<string> {
  readonly value

  constructor(
    add_prefix_method: _value<Function>,
    comments_without_prefix: string[]
  ) {
    this.value = comments_without_prefix.reduce(
      (comment, comment_without_prefix) =>
        comment
          ? `${comment}\n${add_prefix_method.value(comment_without_prefix)}`
          : add_prefix_method.value(comment_without_prefix),
      ''
    )
  }
}

//
//
//

export class With_Comment implements _value<string> {
  readonly value

  constructor(val: string, file_name: string) {
    const file_extension = new File_Extension(file_name)
    const prefix = new Prefix(file_extension)
    const add_prefix = new Add_Prefix(prefix)
    const comment = new Comment(add_prefix, comments_without_prefix)

    this.value = comment.value ? `${comment.value}\n\n${val}` : val
  }
}
