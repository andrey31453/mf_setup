export const home_dir = '..'

export const comment_prefix = {
	js: '//',
	md: ['<!--', '-->'],
	yml: '#',
	sh: '#',
	dockerfile: '#',
	env: '#',
	gitignore: '#',
	prettierignore: '#',
}

export const comments_without_prefix = [
	'не переписывать',
	'данный файл сгенерирован автоматически',
]

export const remote_entry = 'remote_entry.js'

export const shared_react = {
	react: {
		singleton: true,
	},
}

export const shared_react_dom = {
	'react-dom': {
		singleton: true,
	},
}
