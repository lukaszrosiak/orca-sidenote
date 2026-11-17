import { homedir } from 'node:os'
import { win32 } from 'node:path'

const macOSCliPath = '/Applications/Orca.app/Contents/Resources/bin/orca'

export function resolveOrcaCliPath(platform = process.platform, env = process.env) {
  if (platform !== 'win32') return macOSCliPath

  const localAppData = env.LOCALAPPDATA
    || win32.join(env.USERPROFILE || homedir(), 'AppData', 'Local')
  return win32.join(localAppData, 'Programs', 'orca', 'resources', 'bin', 'orca.exe')
}
