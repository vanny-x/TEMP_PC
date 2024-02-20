module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  "globals": {
		"OSS": false, //阿里云上传
		"tinymce": false, //PC端编辑器
		"wx": false, //移动端wx包
		"UE": false, //百度编辑器
		// "WTDC": false //WTDC前端项目全局变量
	},
  'extends': [
    'google',
    'plugin:react/recommended',
    'prettier',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "react/react-in-jsx-scope": "off", //使用JSX时防止丢失React
		"react/prop-types": "off", //防止在React组件定义中丢失props验证
		"import/no-extraneous-dependencies": "off", // 禁止导入未在package.json的依赖项，devDependencies，optionalDependencies或peerDependencies中声明的外部模块。将使用最接近的父package.json。
		"import/prefer-default-export": "off", // 当模块中只有一个导出时，更喜欢使用默认导出而不是命名导出
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], // 检查 React 组件文件的扩展名是否为 .jsx 或 .tsx
		"react/no-unknown-property": ["error", { "ignore": ["css"] }]  //防止使用未知的DOM属性
  },
};
