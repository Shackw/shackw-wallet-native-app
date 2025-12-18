const fs = require("fs");
const path = require("path");

const { withDangerousMod } = require("@expo/config-plugins");

const MARKER_BEGIN = "# >>> shackw:allow-non-modular-includes";
const MARKER_END = "# <<< shackw:allow-non-modular-includes";

const RUBY_SNIPPET = `
  ${MARKER_BEGIN}
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      config.build_settings['GCC_TREAT_WARNINGS_AS_ERRORS'] = 'NO'
    end
  end
  ${MARKER_END}
`;

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripExistingSnippet(contents) {
  const re = new RegExp(`${escapeRegExp(MARKER_BEGIN)}[\\s\\S]*?${escapeRegExp(MARKER_END)}\\n?`, "g");
  return contents.replace(re, "");
}

function findPostInstallBlocks(lines) {
  const startRe = /^\s*post_install\s+do\b/;
  const endRe = /^\s*end\s*$/;

  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    if (!startRe.test(lines[i])) continue;

    let depth = 0;
    let start = i;
    let end = -1;

    for (let j = i; j < lines.length; j++) {
      const line = lines[j];
      const trimmed = line.trimStart();

      if (/\bdo\b/.test(line) && !trimmed.startsWith("#")) depth += 1;

      if (endRe.test(line) && !trimmed.startsWith("#")) {
        depth -= 1;
        if (depth === 0) {
          end = j;
          break;
        }
      }
    }

    if (end !== -1) {
      blocks.push({ start, end });
      i = end;
    }
  }

  return blocks;
}

function blockContainsMarker(lines, block) {
  for (let i = block.start; i <= block.end; i++) {
    if (lines[i].includes(MARKER_BEGIN)) return true;
  }
  return false;
}

function insertSnippetIntoBlock(lines, block) {
  lines.splice(block.end, 0, ...RUBY_SNIPPET.trimEnd().split("\n"));
  return lines;
}

function ensureSnippet(contents) {
  contents = stripExistingSnippet(contents);

  let lines = contents.split("\n");
  let blocks = findPostInstallBlocks(lines);

  if (blocks.length >= 2) {
    const toRemove = blocks.filter(b => blockContainsMarker(lines, b));
    if (toRemove.length > 0) {
      for (const b of toRemove.sort((a, b) => b.start - a.start)) {
        lines.splice(b.start, b.end - b.start + 1);
      }
      blocks = findPostInstallBlocks(lines);
    }
  }

  blocks = findPostInstallBlocks(lines);

  if (blocks.length === 0) {
    return (
      lines.join("\n").trimEnd() +
      `

post_install do |installer|
  react_native_post_install(installer)
${RUBY_SNIPPET}
end
`
    );
  }

  lines = insertSnippetIntoBlock(lines, blocks[0]);
  return lines.join("\n");
}

module.exports = function withNonModularHeadersFix(config) {
  return withDangerousMod(config, [
    "ios",
    async cfg => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, "Podfile");
      let contents = fs.readFileSync(podfilePath, "utf8");

      if (
        contents.includes(MARKER_BEGIN) &&
        contents.includes("CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES")
      ) {
        return cfg;
      }

      contents = ensureSnippet(contents);
      fs.writeFileSync(podfilePath, contents);
      return cfg;
    }
  ]);
};
