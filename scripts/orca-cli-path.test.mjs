import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveOrcaCliEnvironment, resolveOrcaCliPath } from '../src/orca-cli-path.mjs'

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

test('supplies APPDATA for Windows CLI calls when the worker environment omits it', () => {
  const env = { USERPROFILE: 'C:\\Users\\Test', PATH: 'C:\\Windows\\System32' }
  assert.deepEqual(resolveOrcaCliEnvironment('win32', env), {
    ...env,
    APPDATA: 'C:\\Users\\Test\\AppData\\Roaming'
  })
  assert.equal(env.APPDATA, undefined)
})

test('preserves a Windows APPDATA override and leaves other platforms unchanged', () => {
  const windowsEnv = { APPDATA: 'D:\\Roaming', USERPROFILE: 'C:\\Users\\Test' }
  assert.equal(resolveOrcaCliEnvironment('win32', windowsEnv), windowsEnv)

  const macOSEnv = {}
  assert.equal(resolveOrcaCliEnvironment('darwin', macOSEnv), macOSEnv)
})
