import * as fs from 'node:fs'
import { parse as parseJSONC } from 'jsonc-parser'

async function main() {
  const f = './README.md'
  const raw = fs.readFileSync(f, 'utf8')
  const rawData = fs.readFileSync('./data.jsonc', 'utf8')
  const data = parseJSONC(rawData)
  let badges = []
  for (let item of data.data) {
    badges.push(`<!-- ${item.name} -->`)
    for (let row of item.list) {
      badges.push(`[![${row.name}](https://img.shields.io/badge/${encodeURIComponent(row.name)}-${row.backgroundColor??data.default.backgroundColor}?logo=${row.logo}${row.logoColor?'&logoColor=' + row.logoColor : ''})](${row.url})`)
    }
    badges.push('')
  }
  const fixed = raw.replace(/\n(## What I am using)[^##]+/, '\n$1\n\n' + badges.join('\n') + '\n')
  fs.writeFileSync(f, fixed)
}

await main()
