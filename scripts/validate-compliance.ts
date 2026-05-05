import { readContentFiles } from "./lib/content-files";

const zhForbidden = [
  "完全匿名",
  "不可追踪",
  "绕过KYC",
  "绕过 KYC",
  "规避监管",
  "逃避监管",
  "逃避制裁",
  "规避制裁",
  "无实名购买教程"
];

const enForbidden = [
  "completely anonymous",
  "untraceable",
  "bypass KYC",
  "evade regulation",
  "evade sanctions",
  "anonymous purchase tutorial"
];

const allowedContext = /(不得|不能|不应|不用于|不提供|不构成|不等于|不是|避免|禁止|风险|合规|边界|误区|披露|教育|研究|must not|should not|does not|is not|avoid|prohibited|risk|compliant|boundary|disclosure|educational|research)/;

const files = await readContentFiles();
const errors: string[] = [];

for (const item of files) {
  const isEn = item.file.includes("/en-");
  const forbidden = isEn ? enForbidden : zhForbidden;
  const lines = item.content.split("\n");
  lines.forEach((line, index) => {
    for (const term of forbidden) {
      if (line.includes(term) && !allowedContext.test(line)) {
        errors.push(`${item.file}:${index + 1}: risky expression "${term}" lacks compliance context`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error(`Compliance validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Compliance validation passed for ${files.length} content pages.`);
