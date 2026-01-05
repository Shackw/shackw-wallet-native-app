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
            "@appc": "./src/app/_components",
            "@apph": "./src/app/_hooks",
            "@mainc": "./src/app/(main)/_components",
            "@mainh": "./src/app/(main)/_hooks",
            "tailwind.config": "./tailwind.config.js"
          },
          extensions: [".ts", ".tsx", ".js", ".json"]
        }
      ],
      "react-native-worklets/plugin"
    ]
  };
};
