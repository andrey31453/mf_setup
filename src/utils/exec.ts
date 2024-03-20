import { execSync } from 'child_process'

export const exec = (cmd: string) => execSync(cmd, { stdio: 'inherit' })
