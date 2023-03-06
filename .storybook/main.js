module.exports = {
  stories: [
    "../projects/my-lib/src/**/*.stories.mdx",
    "../projects/my-lib/src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/angular",
  core: {
    builder: "@storybook/builder-webpack5"
  }
}