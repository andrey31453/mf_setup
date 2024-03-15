import { _value } from '~types'
import { d, webpack, compose, npm, builder } from '~decorators'
import { Is_Need } from '~utils'

//
//
//

interface _is_need__props {
  excludes?: string[]
  includes?: string[]
}

//
//
//

export class Is_Need_M implements _value<boolean> {
  readonly value

  constructor(path: string, props: _is_need__props) {
    this.value = this.filter(path, props)
  }

  @d(builder)
  @d(npm)
  @d(compose)
  @d(webpack)
  private filter(path: string, props: _is_need__props): boolean {
    return new Is_Need(path, props.includes, props.excludes).value
  }
}

//
//
//

export class Not_Need_M implements _value<boolean> {
  readonly value

  constructor(path: string, props: _is_need__props) {
    this.value = !new Is_Need_M(path, props).value
  }
}
