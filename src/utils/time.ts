export function getElapsedTime(start: Date, end: Date) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  let remainingMs = Math.max(startMs, endMs) - Math.min(startMs, endMs);
  const times: number[] = [];
  // Iterate till seconds are counted.
  for (let i = 0; i < 3; i++) {
    const timeInterval = (60 ** (2 - i)) * 1000;
    times.push(Math.trunc(remainingMs / timeInterval));
    remainingMs %= timeInterval;
  }
  // Push remaining milliseconds.
  times.push(remainingMs);
  return times;
}
