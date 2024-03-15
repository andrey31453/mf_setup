import { _file_manifest, _manifest } from '~types'

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
      arora: false,
      react: false,
      webpack: false,
      compose: false,
      semantic: true,
      default_scripts: false,
      fsd: false,
      scripts: {
        init: 'ts-node ./src/init.ts',
        preset: 'ts-node ./src/preset.ts',
      },

      not_gitignore: ['tsconfig.json', 'package.json', '.bd'],
      excludes: ['readme.md', 'dev.sh'],
      aliases: {
        '~types': 'types',
        '~config': 'config',
        '~decorators': 'decorators',
        '~generates': 'generates',
        '~modules': 'modules',
        '~utils': 'utils',
        '~bd': 'bd',
        '~fs': 'fs',
      },
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
      compose: false,
      default_scripts: false,
      not_gitignore: [],
      node: false,
      includes: [
        '.gitignore',
        'dev.sh',
        'setup.sh',
        'readme.md',
        'package.json',
        'dev.docker-compose.yml',
      ],
    },
  },

  // npm
  {
    is: (m) => !!m.npm,
    configure: {
      name: "DON'T HAVE NAME",
      rate: 0,
      react: false,
      fsd: false,
      webpack: false,
      semantic: true,
      arora: false,
      compose: false,
      default_scripts: false,
      not_gitignore: [],
      excludes: ['package.json'],
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
