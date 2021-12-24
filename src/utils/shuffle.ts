export function pickRandomQuestion(max: number): number {
  // generate a random number less than max
  return Math.floor(Math.random() * max)
}
