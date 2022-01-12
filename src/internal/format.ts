import { ModuleInfos } from "license-checker-rseidelsohn";
import {markdownTable} from 'markdown-table'

export function asMarkdownList(sorted: ModuleInfos): string {
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

export function asMarkdownTable(sorted: ModuleInfos): string {
  let table: string[][] = [
    ["Module", "License", "Repository"],
  ];
  Object.keys(sorted).forEach((key) => {
    const module = sorted[key];
    table.push([key, formatLicense(module.licenses), module.repository || ""]);
  });
  return markdownTable(table)
}

function formatLicense(licenses: string[] | string | undefined): string {
  if (Array.isArray(licenses)) {
    return licenses.join(", ");
  } else if (typeof licenses === "string") {
    return licenses;
  } else {
    return "";
  }
}
