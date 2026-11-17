import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveOrcaCliPath } from '../src/orca-cli-path.mjs'

test('resolves the bundled Orca CLI for the default Windows installation', () => {
  assert.equal(
    resolveOrcaCliPath('win32', { LOCALAPPDATA: 'C:\\Users\\Test\\AppData\\Local' }),
    'C:\\Users\\Test\\AppData\\Local\\Programs\\orca\\resources\\bin\\orca.exe'
  )
})

test('falls back to the Windows user profile when LOCALAPPDATA is unset', () => {
  assert.equal(
    resolveOrcaCliPath('win32', { USERPROFILE: 'C:\\Users\\Test' }),
    'C:\\Users\\Test\\AppData\\Local\\Programs\\orca\\resources\\bin\\orca.exe'
  )
})

test('preserves the existing macOS Orca CLI path', () => {
  assert.equal(
    resolveOrcaCliPath('darwin', {}),
    '/Applications/Orca.app/Contents/Resources/bin/orca'
  )
})
