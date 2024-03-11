import { _manifest, _data_creator, _value } from '~types'
import { tab_before, tab_after, d } from '~decorators'
import { is_file } from '~fs'
import { Path } from '~utils'

//
//
//

class Sub_Services implements _value<_manifest[]> {
  readonly value

  constructor(current_manifest: _manifest, manifests: _manifest[]) {
    this.value = manifests.filter((m) =>
      new RegExp(current_manifest.path).test(m.path)
    )
  }
}

//
//
//

class Has_Docker implements _value<_manifest[]> {
  readonly value

  constructor(sub_services: _manifest[], dockerfile: string) {
    this.value = sub_services.filter((sub_service) =>
      is_file(new Path(sub_service.path, dockerfile).value)
    )
  }
}

//
//
//

class Services_With_Docker implements _value<_manifest[]> {
  readonly value

  constructor(
    current_manifests: _manifest,
    manifests: _manifest[],
    dockerfile: string
  ) {
    const sub_services = new Sub_Services(current_manifests, manifests).value
    this.value = new Has_Docker(sub_services, dockerfile).value
  }

  get void(): boolean {
    return !this.value.length
  }
}

//
//
//

interface _service_params {
  port: string
  name: string
  workdir: string
  context: string
  dockerfile: string
}

class Services implements _value<string> {
  readonly value

  constructor(m: _manifest, manifests: _manifest[], dockerfile: string) {
    this.value = manifests
      .map((manifest) =>
        this.service(this.service_params(m, manifest, dockerfile))
      )
      .join('')
  }

  private service_params = (
    m: _manifest,
    manifest: _manifest,
    dockerfile: string
  ): _service_params => ({
    name: `s_${manifest.name}`,
    port: `${manifest.port}`,
    workdir: `/mf/${manifest.name}`,
    context: `./${manifest.path.replace(new RegExp(m.path), '').replace(/^\//, '')}`,
    dockerfile,
  })

  @d(tab_after(0))
  @d(tab_before(1))
  private service({
    name,
    port,
    workdir,
    context,
    dockerfile,
  }: _service_params): string {
    return `${name}:
    build:
      context: ${context}
      dockerfile: ${dockerfile}
      args:
        workdir: ${workdir}
    ports:
      - ${port}:${port}
    volumes:
      - ${context}:${workdir}
      - ${workdir}/node_modules
    restart: always`
  }
}

//
//
//

export class Docker_Compose implements _data_creator {
  constructor(private dockerfile: string) {}

  create_data = (
    file_name: string,
    m: _manifest,
    manifests: _manifest[]
  ): string => {
    const services_with_docker = new Services_With_Docker(
      m,
      manifests,
      this.dockerfile
    )
    if (services_with_docker.void) return ''

    return `version: '3'

services:${new Services(m, services_with_docker.value, this.dockerfile).value}`
  }
}
