import koaCombineRoute from 'koa-combine-routers'
import aRouter from './aRouter'
import bRouter from './bRouter'

export default koaCombineRoute(aRouter, bRouter)
