import fg from 'fast-glob'
import { Express, Router } from 'express'
import { srcDir } from '../../src.dir'
import { join } from 'path'

export const setupRoutes = async (app: Express): Promise<void> => {
  const router = Router()

  app.use('/api', router)

  const files = fg.sync('**/src/main/routes/*.routes.ts')

  for (const filePath of files) {
    (await import(join(srcDir, filePath.slice(4, filePath.length)))).default(router)
  }
}
