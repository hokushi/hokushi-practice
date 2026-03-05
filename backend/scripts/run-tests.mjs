import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    const hasSingleQuotes =
      value.length >= 2 && value.startsWith("'") && value.endsWith("'");
    const hasDoubleQuotes =
      value.length >= 2 && value.startsWith('"') && value.endsWith('"');
    if (hasSingleQuotes || hasDoubleQuotes) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

const cwd = process.cwd();
loadEnvFile(path.resolve(cwd, ".env"));

process.env.NODE_ENV = "test";
if (process.env.DATABASE_URL_TEST) {
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
}

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("npx", ["prisma", "migrate", "deploy"]);
run("npx", ["vitest", "run"]);
