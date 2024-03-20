import { _file_manifest, _manifest } from '~types'

//
//
//

export const npm_required_keys: (keyof _file_manifest)[] = [
  'name',
  'version',
  'main',
  'repository',
]

//
//
//

interface _configure {
  is: (m: _file_manifest) => Boolean
  configure: _file_manifest
}

export const configures: _configure[] = [
  // setup
  {
    is: (m) => !!m.setup,
    configure: {
      name: 'setup',
      node: true,
      builder: true,
      arora: false,
      react: false,
      webpack: false,
      compose: false,
      semantic: true,
      default_scripts: false,
      fsd: false,
    },
  },

  // builder
  {
    is: (m) => !!m.builder,
    configure: {
      name: 'builder',
      rate: 0,
      react: false,
      fsd: false,
      webpack: false,
      semantic: true,
      arora: false,
      compose: true,
      default_scripts: false,
      node: false,
    },
  },

  // npm
  {
    is: (m) => !!m.npm,
    configure: {
      rate: 0,
      react: false,
      fsd: false,
      webpack: false,
      semantic: true,
      arora: false,
      compose: false,
      default_scripts: false,
      not_gitignore: ['package.json'],
      node: false,
    },
  },

  // default
  {
    is: () => true,
    configure: {
      name: "DON'T HAVE NAME",
      rate: 0,
      react: true,
      fsd: true,
      webpack: true,
      semantic: true,
      arora: true,
      compose: true,
      default_scripts: true,
      not_gitignore: [],
      node: false,
      npm: false,
    },
  },
]
