import * as fs from 'node:fs'
import * as qs from 'node:querystring'
import * as JSONC from 'jsonc-parser'

async function main() {
  const rawData = fs.readFileSync('./data.jsonc', 'utf8')
  const data = JSONC.parse(rawData)
  let badges = []
  for (let item of data.data) {
    badges.push(`<!-- ${item.name} -->`)
    for (let row of item.list) {
      let params = {
        logo: row.logo
      }
      if (row.logoColor) {
        params['logoColor'] = row.logoColor
      }
      const imageUrl = `https://img.shields.io/badge/${encodeURIComponent(row.name)}-${row.backgroundColor??data.default.backgroundColor}?${qs.stringify(params)}`
      const mdLink = `[![${row.name}](${imageUrl})](${row.url})`
      badges.push(mdLink)
    }
    badges.push('')
  }
  const f = './README.md'
  const rawSrc = fs.readFileSync(f, 'utf8')
  const fixed = rawSrc.replace(/\n(## What I am using)[^##]+/, '\n$1\n\n' + badges.join('\n') + '\n')
  fs.writeFileSync(f, fixed)
}

await main()
