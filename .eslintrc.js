module.exports = {
	"extends": ["airbnb-base"],
	"plugins": [
		"import",
	],
	"rules": {
		"no-param-reassign": [2, {
			"props": false
		}],
		"object-curly-newline": 0,
		"no-console": ["error", {"allow": ["warn", "error"]}],
		"indent": ["error", "tab"],
		"no-underscore-dangle": ["error", {"allow": ["__", "_id", "_", "_source", "_scroll_id", "_embedded"]}],
		"max-len": ["error", { "code": 100, "ignoreComments": true }],
		"no-unused-vars": ["error", {"allow": ["should|expect"]}],
		"no-tabs": 0
	},
	"globals": {},
	"env": {
		"mocha": true,
	},
};
