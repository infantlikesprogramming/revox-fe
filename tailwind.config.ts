export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "roll-down": "rollDown 0.3s ease-out forwards",
      },
      keyframes: {
        rollDown: {
          "0%": {
            opacity: "0",
            transform: "scaleY(0)",
            "transform-origin": "top",
          },
          "100%": {
            opacity: "1",
            transform: "scaleY(1)",
            "transform-origin": "top",
          },
        },
      },
    },
  },
  plugins: [],
};
