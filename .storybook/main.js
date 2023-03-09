module.exports = {
    stories:   ["../projects/my-lib/src/**/*.mdx", "../projects/my-lib/src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons:    ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm", "storybook-addon-designs"],
    framework: {
        name:    "@storybook/angular",
        options: {}
    },
    docs:      {
        autodocs: true
    },
    core:      {
        builder: "webpack5",
    },
};