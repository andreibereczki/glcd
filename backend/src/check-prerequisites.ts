import { DependencyContainer } from 'tsyringe';
import { PrerequisiteCheck, PrerequisiteCheckResult } from './infrastructure/prerequisite-check.interface';
import { InfrastructureDiType } from './infrastructure/infrastructure-di-type';
import { Table } from 'console-table-printer';

export function checkPrerequisites(container: DependencyContainer): boolean {
  const childContainer = container.createChildContainer();
  const prerequisiteChecks = childContainer.resolveAll<PrerequisiteCheck>(InfrastructureDiType.PrerequisiteCheck);

  try {
    const [results, allSuccessful] = runAllChecks(prerequisiteChecks);

    drawCheckTable(prerequisiteChecks, results);

    return allSuccessful;
  } finally {
    childContainer.dispose();
  }
}

function runAllChecks(prerequisiteChecks: PrerequisiteCheck[]): [PrerequisiteCheckResult[], boolean] {
  prerequisiteChecks.sort((check1, check2) => check1.order - check2.order);

  let allSuccessful = true;
  const results = [];
  for (const [index, check] of prerequisiteChecks.entries()) {
    results[index] = check.runChecks();

    if (!results[index].isSuccess) {
      allSuccessful = false;
    }
  }

  return [results, allSuccessful];
}

function drawCheckTable(prerequisiteChecks: PrerequisiteCheck[], results: PrerequisiteCheckResult[]): void {
  const outputTable = new Table({
    columns: [
      { name: "index", alignment: "left", color: "blue" },
      { name: "name", alignment: "left" },
      { name: "success", alignment: "center" },
      { name: "info", alignment: "left", maxLen: 50 },
    ],
    charLength: { "✅": 1, "❌": 1 },
  });

  for (const [index, check] of prerequisiteChecks.entries()) {
    const currentResult = results[index];

    const row = {
      index: check.order,
      name: check.constructor.name,
      success: "✅",
      info: "",
    };

    if (!currentResult.isSuccess) {
      row.success = "❌";
      row.info = currentResult.error?.message ?? "";
    }

    outputTable.addRow(row, {
      color: results[index].isSuccess ? "" : "red",
    });
  }

  console.log("🔍 [Prerequisite Checks]");
  outputTable.printTable();
  console.log();
}
