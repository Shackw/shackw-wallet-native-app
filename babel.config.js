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
            "@mainc": "./src/app/(main)/_components",
            "tailwind.config": "./tailwind.config.js"
          },
          extensions: [".ts", ".tsx", ".js", ".json"]
        }
      ],
      "react-native-worklets/plugin"
    ]
  };
};
