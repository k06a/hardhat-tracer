import { colorLabel } from "../colors";
import { DEPTH_INDENTATION } from "../constants";
import { StructLog, TracerDependenciesExtended } from "../types";
import { parseHex, parseNumber, shallowCopyStack } from "../utils";
import { formatParam } from "../format/param";
import { formatGasCost } from "../format/gas-cost";

export async function printGt(
  structLog: StructLog,
  index: number,
  structLogs: StructLog[],
  dependencies: TracerDependenciesExtended
) {
  const stack = shallowCopyStack(structLog.stack);
  if (stack.length < 2) {
    console.log("Faulty GT");
    return;
  }
  const a = parseHex(stack.pop()!);
  const b = parseHex(stack.pop()!);
  const stackAfter = shallowCopyStack(structLogs[index + 1].stack);
  const result = parseHex(stackAfter.pop()!);

  const str = `${formatParam(a, dependencies)} > ${formatParam(
    b,
    dependencies
  )} => (${parseNumber(result) ? "true" : "false"})`;
  console.log(
    DEPTH_INDENTATION.repeat(structLog.depth) +
      colorLabel("GT") +
      " " +
      str +
      formatGasCost(structLog, null, dependencies)
  );
}
