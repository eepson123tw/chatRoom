module.exports = {
  plugins: [
    require("cssnano")({
      //壓縮大小
      preset: "default",
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
