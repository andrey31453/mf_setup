const names = {
  docker: 'dockerfile',
  compose: 'docker-compose',
  webpack: 'webpack.config',
  bins: {
    dev: 'dev.sh',
    setup: 'setup.sh',
    patch: 'patch.sh',
    minor: 'minor.sh',
    major: 'major.sh',
  },
}

export const paths = {
  file: {
    manifest: 'manifest.json',
    readme: 'readme.md',
    env: '.env',
    gitignore: '.gitignore',

    dockerfile: {
      dev: `dev.${names.docker}`,
    },

    webpack: `${names.webpack}.from_manifest.js`,
    ts_config: 'tsconfig.json',
    package: 'package.json',
    compose: {
      dev: `dev.${names.compose}.yml`,
    },
  },

  dir: {
    copy_to_m: './src/assets',
    bd: './src/.bd',
    src: './src',
  },
}

export const files = {
  builder: [names.bins.setup],
  webpack: [names.webpack, names.docker],
  compose: [names.compose, names.bins.dev],
  npm: [names.bins.patch, names.bins.minor, names.bins.major],
}
