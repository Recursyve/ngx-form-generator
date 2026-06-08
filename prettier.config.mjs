/**
 * @type {import('prettier').Options}
 */
export default {
    $schema: "https://json.schemastore.org/prettierrc",
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "none",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "lf",
    arrowParens: "always",
    plugins: ["prettier-plugin-organize-imports"],
    printWidth: 120,
    semi: true,
    useTabs: false,
    overrides: [
        {
            files: ["src/**/*.html"],
            options: {
                parser: "angular"
            }
        }
    ]
};
