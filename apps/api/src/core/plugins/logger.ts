import { Elysia } from 'elysia'

export const logger = () =>
  new Elysia({ name: 'plugin.logger' })
    .decorate('logger', new Logger())
    .as('global')

export class Logger {
  private readonly timestamp = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

  info(message: string) {
    console.log(`${this.timestamp} ${colors.blue('[INFO]')}: ${message}`)
  }

  warn(message: string) {
    console.warn(`${this.timestamp} ${colors.yellow('[WARN]')}: ${message}`)
  }

  error(message: string) {
    console.error(
      `${colors.white(this.timestamp)} ${colors.red('[ERROR]')}: ${message}`,
    )
  }

  debug(message: string) {
    console.debug(`${this.timestamp} ${colors.cyan('[DEBUG]')}: ${message}`)
  }
}

const color = (code: number) => (text: string) =>
  `\u001B[${code}m${text}\u001B[0m`

export const colors = {
  red: color(31),
  green: color(32),
  yellow: color(33),
  blue: color(34),
  magenta: color(35),
  cyan: color(36),
  white: color(37),
  gray: color(90),
}
