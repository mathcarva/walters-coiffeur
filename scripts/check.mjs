import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const task = process.argv[2]

if (task !== 'typecheck' && task !== 'build') {
  process.stderr.write('Use: node scripts/check.mjs typecheck|build\n')
  process.exit(2)
}

for (const [file, args] of [
  ['node_modules/typescript/bin/tsc', ['--noEmit']],
  ...(task === 'build' ? [['node_modules/vite/bin/vite.js', ['build']]] : []),
]) {
  const result = spawnSync(process.execPath, [resolve(root, file), ...args], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  })
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`)
    process.exit(1)
  }
  if (result.status !== 0) process.exit(result.status ?? 1)
}
