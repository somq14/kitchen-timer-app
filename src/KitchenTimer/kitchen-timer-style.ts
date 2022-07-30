export const mmToDp = (value: number): number => {
  // Android mdpi は 160 dpi 程度
  // 160 [dpi] = 160 / 25.4 [dot/mm] = 6.29... [dot/mm]
  const ratio = 160 / 25.4;
  return Math.round(ratio * value);
};
