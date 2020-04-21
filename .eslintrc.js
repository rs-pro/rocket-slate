module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "./"
  },
  "plugins": [
    "import",
    "@typescript-eslint",
    "prettier"
  ],
  "settings": {
    "import/extensions": [".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/external-module-folders": ["node_modules", "packages"],
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".es6",
          ".sass",
          ".scss",
          ".json"
        ]
      },
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },
  "rules": {
    "react/jsx-wrap-multilines": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts",".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "error",
    // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions#answer-59268871
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  "overrides": [
    {
      "files": ["**/*.tsx", "**/*.ts"],
      "rules": {
        "react/prop-types": "off"
      }
    }
  ]
}
