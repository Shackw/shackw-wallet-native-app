import expoConfig from "eslint-config-expo/flat.js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  ...expoConfig,
  {
    ignores: ["dist/*"],
    plugins: {
      prettier: pluginPrettier
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    },
    rules: {
      "prettier/prettier": "error",
      "react/no-children-prop": "off",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false
        }
      ]
    }
  }
];
