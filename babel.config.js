module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind"
        }
      ],
      "nativewind/babel"
    ],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@routes": "./src/routes",
            "@routesc": "./src/routes/_components",
            "@routesh": "./src/routes/_hooks",
            "@mainc": "./src/routes/(main)/_components",
            "@mainh": "./src/routes/(main)/_hooks",

            "tailwind.config": "./tailwind.config.js"
          },
          extensions: [".ts", ".tsx", ".js", ".json"]
        }
      ],
      "react-native-worklets/plugin"
    ]
  };
};
