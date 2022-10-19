export class ServerError extends Error {
  constructor () {
    super('An unexpected error ocurred')
    this.name = 'ServerError'
  }
}
