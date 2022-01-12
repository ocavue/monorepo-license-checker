import { asCSV, asTree, ModuleInfos } from "license-checker-rseidelsohn";
import { checkLicenses } from "./check-license";
import { asMarkdownList, asMarkdownTable } from "./format";

const helpMessage = `monorepo-license-checker

Options:
  --json                        Output in JSON format.
  --csv                         Output in CSV format.
  --markdown                    Output in markdown list format.
  --markdown-table              Output in markdown table format.
  --exclude-private-packages    Restrict output to not include any package marked as private.
  --help                        The text you are reading right now :)
`;

function format(argv: string[], modules: ModuleInfos): string {
  if (argv.includes("--json")) {
    return JSON.stringify(modules, null, 4) + "\n";
  }

  if (argv.includes("--csv")) {
    return asCSV(modules);
  }

  if (argv.includes("--markdown")) {
    return asMarkdownList(modules);
  }

  if (argv.includes("--markdown-table")) {
    return asMarkdownTable(modules);
  }

  return asTree(modules);
}

export async function runCli() {
  const argv = process.argv;
  if (argv.includes("-h") || argv.includes("--help")) {
    console.log(helpMessage);
  } else {
    const modules = await checkLicenses(process.cwd(), {
      excludePrivatePackages: argv.includes("--exclude-private-packages"),
    });
    const output = format(argv, modules);
    console.log(output);
  }
}
