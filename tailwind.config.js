module.exports = {
    content: ["src/**/*.{ts,vue}", "dev/**/*.{ts,vue}", "/index.html"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
