import chalk from "chalk";

export function error(message: string): never {
    throw new Error(`[${chalk.blue("Utilscord")}] [${chalk.red("ERROR")}] : ${message}`);
}

export function crash(...message: unknown[]) {
  console.log(`[${chalk.blue("Utilscord")}] [${chalk.yellow("CRASH")}] : ${message}`);
}

export function logError(message: string): void {
  console.error(`[${chalk.blue("Utilscord")}] [${chalk.red("ERROR")}] : ${message}`);
}

export function logWarn(message: string): void {
  console.warn(`[${chalk.blue("Utilscord")}] [${chalk.yellow("WARN")}] : ${message}`);
}

export function logInfo(message: string): void {
  console.info(`[${chalk.blue("Utilscord")}] [${chalk.blueBright("INFO")}] : ${message}`);
}
