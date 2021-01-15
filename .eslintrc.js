module.exports = {
	env: {
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		'ecmaVersion': 12
	},
	rules: {
		indent: [2, 'tab', { SwitchCase: 1 }],
		quotes: [2, 'single', { allowTemplateLiterals: true }],
		semi: [2, 'always'],
		'comma-dangle': [0, 'always-multiline'],
		'no-console': [0],
		'no-unused-vars': [1],
	},
};
