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

interface _compose_params {
  service_name: string
  volume_name: string
  port: string
  workdir: string
  context: string
  dockerfile: string
}

class Compose_Params implements _value<_compose_params> {
  readonly value

  constructor(m: _manifest, manifest: _manifest, dockerfile: string) {
    this.value = {
      service_name: `s_${manifest.name}`,
      volume_name: `v_${manifest.name}`,
      port: `${manifest.port}`,
      workdir: `/files/${manifest.name}`,
      context: `./${manifest.path.replace(new RegExp(m.path), '').replace(/^\//, '')}`,
      dockerfile,
    }
  }
}

//
//
//

class Services implements _value<string> {
  readonly value

  constructor(m: _manifest, manifests: _manifest[], dockerfile: string) {
    this.value = manifests
      .map((manifest) =>
        this.service(new Compose_Params(m, manifest, dockerfile).value)
      )
      .join('')
  }

  @d(tab_after(0))
  @d(tab_before(1))
  private service({
    service_name,
    volume_name,
    port,
    workdir,
    context,
    dockerfile,
  }: _compose_params): string {
    return `${service_name}:
    build:
      context: ${context}
      dockerfile: ${dockerfile}
      args:
        workdir: ${workdir}
    ports:
      - ${port}:${port}
    volumes:
      - ${context}:${workdir}
      - ${volume_name}:${workdir}/node_modules
    restart: always`
  }
}

//
//
//

class Volumes implements _value<string> {
  readonly value

  constructor(m: _manifest, manifests: _manifest[], dockerfile: string) {
    this.value = manifests
      .map((manifest) =>
        this.volume(new Compose_Params(m, manifest, dockerfile).value)
      )
      .join('')
  }

  @d(tab_after(0))
  @d(tab_before(1))
  private volume({ volume_name, context }: _compose_params): string {
    return `${volume_name}:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ${context}/node_modules`
  }
}

//
//
//

export class Compose implements _data_creator {
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

services:${new Services(m, services_with_docker.value, this.dockerfile).value}

volumes:${new Volumes(m, services_with_docker.value, this.dockerfile).value}`
  }
}
