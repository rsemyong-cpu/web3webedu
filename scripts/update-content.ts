import { spawnSync } from "node:child_process";

const skipGenerate = process.argv.includes("--skip-generate");
type Step = [string, string[]];

const steps: Step[] = [
  ...(skipGenerate ? [] : ([["npm", ["run", "generate"]]] as Step[])),
  ["npm", ["run", "validate"]],
  ["npm", ["run", "generate:rss"]],
  ["npm", ["run", "generate:sitemaps"]]
];

for (const [command, args] of steps) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
