import { _generate, _generate_data, _bd_name, _manifest } from '~types'
import { not_bd } from '~config'
import { rm } from '~fs'
import { Not_Need } from '~utils'
import { BD } from './bd'

//
//
//

export class Generate implements _generate {
  value = [] as _generate_data[]

  constructor(private name: _bd_name) {}

  add = (m: _manifest, path: _generate_data) => {
    if (new Not_Need(path, null, not_bd).value) return
    this.value.push(path)
  }

  set = () => {
    this.rm_not_writtable()
    this.set_bd()
    this.reset()
  }

  private rm_not_writtable = () => this.not_writtable().forEach(rm)

  private not_writtable = (): _generate_data[] => {
    return this.bd_data().filter((b) => !this.value.includes(b))
  }

  private bd_data = (): _generate_data[] => new BD(this.name).get()

  private set_bd = () => new BD(this.name).set(this.value)

  private reset = () => (this.value = [] as _generate_data[])
}
