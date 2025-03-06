export async function loadFreqFile(file: string): Promise<{ freq: number; elem: string }[]> {
  const lines = await fileLines(file)
  const aggregate = new Array<{ freq: number; elem: string }>()
  for (let i = 0; i < lines.length - 1; i += 2) {
    const elem = lines[i]
    const freq = parseInt(lines[i + 1])
    aggregate.push({ freq, elem })
  }
  return aggregate
}

async function fileLines(file: string): Promise<string[]> {
  const content = await fetch(file)
  const text = await content.text()
  return text.split('\n').filter(includeLine)
}

function includeLine(line: string): boolean {
  return !excludeLine(line)
}

function excludeLine(line: string): boolean {
  return line.startsWith('//') || !line.trim()
}
