import { _manifest, _data_creator } from '~types'
import { remote_entry, react_packages, fsd_aliases } from '~config'
import { Current_Manifest, SRC, Field_Value } from '~utils'

//
//
//

const iterators = {
  expose: (expose_value: string, expose_key: string) =>
    `'./${expose_key}': src + '/${expose_value}'`,

  remote:
    (manifests: _manifest[]) => (remote_value: string, remote_key: string) => {
      const { port, domens }: _manifest = new Current_Manifest(
        manifests,
        remote_value
      ).value

      const domen = `\`\${dev ? '${domens.dev}' : '${domens.prod}'}`

      return `'./${remote_key}': ${domen}:${port}/${remote_entry}\``
    },

  // TODO write shared props
  shared: (shared_value: string) => `'${shared_value}': { singleton: true }`,
}

//
//
//

export class Webpack_Config implements _data_creator {
  constructor() {}

  create_data = (
    file_name: string,
    m: _manifest,
    manifests: _manifest[]
  ): string => `const src = path.join(__dirname, '${new SRC(m).value}')

module.exports = ({ dev }) => ({
	plugins: [
		new module_federation({
      name: '${m.name}',
      filename: '${remote_entry}',
			${
        new Field_Value({
          field: 'exposes',
          value: m.exposes,
          iterator: iterators.expose,
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
          values: [m.shared, m.react && react_packages],
          iterator: iterators.shared,
          quotes: 'none',
        }).value
      }
    }),
	],

	resolve: {
		${
      new Field_Value({
        field: 'alias',
        // @ts-ignore
        values: [m.aliases, m.fsd && fsd_aliases],
        iterator: (aliase_value: string, aliase_key: string) =>
          `'${aliase_key}': src + '${aliase_value}'`,
        quotes: 'none',
      }).value
    }
	},
})`
}
