/** @type {import("eslint").Linter.Config} */
module.exports = {
  // ...
  extends: [
    // ...
    "plugin:tailwindcss/recommended",
  ],
  settings: {
    // ...
    tailwindcss: {
      callees: ["twMerge", "createTheme"],
      classRegex: "^(class(Name)|theme)?$",
    },
  },
};