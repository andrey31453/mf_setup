// не переписывать
// данный файл сгенерирован автоматически

const src = path.join(__dirname, './src')

module.exports = ({ dev }) => ({
	plugins: [
		new module_federation({
			name: 'setup',
			filename: 'remote_entry.js',
			exposes: {
				'./t1': src + '/a1',
				'./t2': src + '/a2',
				'./t3': src + '/a3',
			},
			remotes: {
				'./r1': `${dev ? 'http://localhost' : 'https://prod'}:8003/remote_entry.js`,
			},
		}),
	],

	resolve: {
		alias: {
			'~types': src + 'types',
			'~config': src + 'config',
			'~decorators': src + 'decorators',
			'~file_data_creators': src + 'file_data_creators',
			'~bd': src + 'bd',
			'~modules': src + 'modules',
			'~utils': src + 'utils',
			'~fs': src + 'fs',
		},
	},
})
