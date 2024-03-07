const file_names = {
	docker: 'dockerfile',
	compose: 'docker-compose',
	webpack: 'webpack.config',
}

export const paths = {
	file: {
		manifest: 'manifest.json',
		readme: 'readme.md',
		env: '.env',
		gitignore: '.gitignore',

		dockerfile: {
			dev: `dev.${file_names.docker}`,
		},

		webpack_config: `${file_names.webpack}.from_manifest.js`,
		ts_config: 'tsconfig.json',
		package: 'package.json',
		docker_compose: {
			dev: `dev.${file_names.compose}.yml`,
		},
	},

	dir: {
		copy_to_m: './src/assets',
		bd: './src/.bd',
		src: './src',
	},
}

export const webpack_files = [file_names.webpack, file_names.docker]

export const compose_files = [file_names.compose]
