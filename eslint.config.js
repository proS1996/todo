import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"] // Ignore build output folder
  },
  {
    files: ["**/*.{js,jsx}"], // Match .js and .jsx files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Define browser globals like `window`
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module" // Use ES Modules
      }
    },
    settings: {
      react: { version: "detect" }, // Automatically detect React version
      "import/resolver": {
        alias: {
          map: [
            ["@src", "./src"],
            ["@components", "./src/components"],
            ["@features", "./src/features"],
            ["@hooks", "./src/hooks"],
            ["@pages", "./src/pages"],
            ["@services", "./src/services"],
            ["@utils", "./src/utils"],
            ["@routes", "./src/routes"],
            ["@modules", "./src/modules"],
            ["@app", "./src/app"]
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"] // Supported file extensions
        }
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off", // Allow links without rel="noopener noreferrer",
      "react/prop-types": "off", // Disable prop-types rule for modern React projects
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    }
  }
];
