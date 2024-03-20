const names = {
  docker: {
    dockerfile: 'dockerfile',
    compose: 'docker-compose',
    ignore: 'dockerignore',
  },

  webpack: 'webpack.config',
  version: '.version',
  bins: {
    dev: 'dev.sh',
    prune: 'prune.sh',
    setup: 'setup.sh',
    update: 'update.sh',
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
      dev: `dev.${names.docker.dockerfile}`,
    },

    webpack: `${names.webpack}.from_manifest.js`,
    ts_config: 'tsconfig.json',
    version: names.version,
    package: 'package.json',
    compose: {
      dev: `dev.${names.docker.compose}.yml`,
    },
  },

  dir: {
    copy_to_m: './src/assets',
    bd: './src/.bd',
    src: './src',
  },
}

export const files = {
  builder: [names.bins.setup, names.bins.update],
  webpack: [names.webpack, names.docker.dockerfile, names.docker.ignore],
  compose: [names.docker.compose, names.bins.dev, names.bins.prune],
  npm: [names.bins.patch, names.bins.minor, names.bins.major, names.version],
}
