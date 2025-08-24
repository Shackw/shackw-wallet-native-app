import expoConfig from "eslint-config-expo/flat.js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  ...expoConfig,
  {
    ignores: ["dist/*"],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      "prettier/prettier": "error",
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
      ]
    }
  }
];
