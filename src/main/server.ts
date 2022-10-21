import { mongoHelper } from '../infra/db/mongodb/helpers/mongo.helper'
import env from './config/env.system'

mongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = (await import('./config/app.express'))

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}/`)
    )
  })
  .catch(console.error)
