import { ModuleInfos } from "license-checker-rseidelsohn";

export function asMarkdown(sorted: ModuleInfos): string {
  let text: string[] = [];
  Object.keys(sorted).forEach((key) => {
    const module = sorted[key];
    if (module.repository) {
      text.push(`- [${key}](${module.repository}) - ${module.licenses}`);
    } else {
      text.push(`- ${key} - ${module.licenses}`);
    }
  });
  return text.join("\n");
}
