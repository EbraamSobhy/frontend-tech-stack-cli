export const FRAMEWORKS = {
    react: {
        command: "npm create vite@latest",
        args: "-- --template react",
        template: "react",
    },

    vue: {
        command: "npm create vue@latest",
        args: "",
        template: "vue",
    },

    sveltekit: {
        command: "npx sv create myapp",
        args: "",
        template: "sveltekit",
    },

    next: {
        command: "npx create-next-app@latest",
        args: "",
        template: "next",
    },

    nuxt: {
        command: "npm create nuxt@latest",
        args: "",
        template: "nuxt",
    },
};
