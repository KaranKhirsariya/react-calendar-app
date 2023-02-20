import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './swaggers/calendar-todo-swagger.json',
  apiFile: './src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store/todoApi.ts',
  exportName: 'todoApi',
  hooks: true,
}

export default config