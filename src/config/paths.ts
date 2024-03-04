export const paths = {
	file: {
		manifest: 'manifest.json',
		readme: 'readme.md',
		env: '.env',
		gitignore: '.gitignore',

		dockerfile: {
			dev: 'dev.dockerfile',
		},

		webpack_config: 'webpack.config.from_manifest.js',
		ts_config: 'tsconfig.json',
		package: 'package.json',
		docker_compose: {
			dev: 'dev.docker-compose.yml',
		},
	},

	dir: {
		copy_to_m: './src/assets',
		bd: './src/.bd',
		src: './src',
	},
}

export const webpack_file_name = 'webpack.config'
