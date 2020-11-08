import combineRouters from 'koa-combine-routers'
import requireContext from 'require-context'
// import publicRouter from './modules/publicRouter'
import path from 'path'
const modPath = path.resolve(__dirname, 'modules')
console.log('modPath', modPath)
const moduleFiles = requireContext(modPath, true, /\.js$/)

const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path)
  items.push(value.default)
  return items
}, [])

export default combineRouters(modules)
