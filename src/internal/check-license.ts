import { getPackages } from "@manypkg/get-packages";
import { init } from "license-checker-rseidelsohn";
import type { InitOpts, ModuleInfos } from "./types";

async function check(options: InitOpts): Promise<ModuleInfos> {
  return new Promise((resolve, reject) => {
    init(options, (err, packages) => {
      if (err) {
        reject(err);
      } else {
        resolve(packages);
      }
    });
  });
}

function sortObject<T extends object>(unordered: T): T {
  const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      // @ts-ignore
      obj[key] = unordered[key];
      return obj;
    }, {} as T);
  return ordered;
}

export async function checkLicenses(
  cwd?: string,
  options?: InitOpts
): Promise<ModuleInfos> {
  const { root, packages } = await getPackages(cwd ?? process.cwd());
  const dirs = packages.map((p) => p.dir).concat(root.dir);

  const moduleInfos: ModuleInfos = {};
  for (const dir of dirs) {
    Object.assign(moduleInfos, await check({ ...options, start: dir }));
  }

  return sortObject(moduleInfos);
}
