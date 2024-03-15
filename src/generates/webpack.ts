import { _manifest, _data_creator } from '~types'
import { remote_entry, packages } from '~config'
import { Current_Manifest, SRC, Field_Value, Path } from '~utils'

//
//
//

const iterators = {
  expose: (m: _manifest) => (expose_value: string, expose_key: string) =>
    `'./${expose_key}': '${new Path(new SRC(m).value, expose_value).value}'`,

  remote:
    (manifests: _manifest[]) => (remote_value: string, remote_key: string) => {
      const { port, domens }: _manifest = new Current_Manifest(
        manifests,
        remote_value
      ).value

      const domen = `\${dev ? '${domens.dev}' : '${domens.prod}'\}`

      return `'${remote_key}': \`${remote_key}@${domen}:${port}/${remote_entry}\``
    },

  // TODO write shared props
  shared: (verison, package_name) => `'${package_name}': {singleton: true}`,
}

//
//
//

export class Webpack implements _data_creator {
  constructor() {}

  create_data = (
    file_name: string,
    m: _manifest,
    manifests: _manifest[]
  ): string => `const src =  __dirname + '/src/'
const dist = __dirname + '/dist/'
const { ModuleFederationPlugin: module_federation } =
  require('webpack').container

module.exports = ({ dev }) => ({
	devServer: dev
		? {
			hot: true,
			port: ${m.port},
			static: dist,
			allowedHosts: 'all',
		}
		: undefined,

	plugins: [
		new module_federation({
      name: '${m.name}',
      filename: '${remote_entry}',
			${
        new Field_Value({
          field: 'exposes',
          value: m.exposes,
          iterator: iterators.expose(m),
          quotes: 'none',
        }).value
      }
			${
        new Field_Value({
          field: 'remotes',
          value: m.remotes,
          iterator: iterators.remote(manifests),
          quotes: 'none',
        }).value
      }
			${
        new Field_Value({
          field: 'shared',
          // @ts-ignore
          values: [m.react && packages.react],
          iterator: iterators.shared,
          quotes: 'none',
        }).value
      }
    }),
	],
})`
}
