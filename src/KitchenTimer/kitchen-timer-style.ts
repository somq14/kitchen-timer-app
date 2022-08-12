export const mmToDp = (value: number): number => {
  // Android mdpi は 160 dpi 程度
  // 160 [dpi] = 160 / 25.4 [dot/mm] = 6.29... [dot/mm]
  // 実機で調節し、 140 dpi 想定で表示
  const ratio = 140 / 25.4;
  return Math.round(ratio * value);
};
