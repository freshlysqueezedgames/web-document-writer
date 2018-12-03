// @flow

import fs from 'fs'

import express from 'express'
import fallback from 'express-history-api-fallback'
import webpack from 'webpack'
import * as Webpack from 'webpack'

import {Configuration} from './webpack'

type Flag = $ReadOnly<{|
  name: string,
  value: string | void
|}>

const flags: Array<Flag> = []

process.argv.forEach((arg: string): void => {
  if (!arg.match('--')) {
    return
  }

  const [name, value] = arg.replace('--', '').split(/=/)

  flags.push({name, value})
})

type RunResolve = () => void
type RunReject = (error: {}) => void

function Run (): Promise<void> {
  const app: express = express()
  const dir: string = `${__dirname}/../dist`

  const port: number = 3000

  return new Promise((resolve: RunResolve, reject: RunReject): void => {
    try {
      app.use(express.static(dir))
      app.use(fallback('index.html', {root: dir}))

      app.listen(port, (): void => console.log(`Listening on port ${port}`))
    } catch (error) {
      reject(error)
    }
  })
}

type BuildResolve = () => void
type BuildReject = (error: Webpack.Error) => void

function Build (): Promise<void> {
  const compiler: Webpack = webpack(Configuration())

  return new Promise((resolve: BuildResolve, reject: BuildReject): void => {
    console.time('webpack build')

    compiler.run((error: Object, stats: Object): void => {
      if (error) {
        reject(error)
        return
      }

      if (stats && stats.hasErrors()) {
        reject(stats.toJson().errors)
        return
      }

      console.timeEnd('webpack build')
      resolve()
    })
  })
}

(async (): Promise<void> => {
  const l: number = flags.length

  console.log('flags are', flags)

  async function RunFlag (i: number = 0): Promise<void> {
    const flag: flag = flags[i]

    try {
      switch (flag.name) {
        case 'build': {
          await Build()
          break
        }
        default: {
          await Run()
        }
      }
    } catch (error) {
      console.log(`Error occurred with process: ${flag.name}, see errors.json for further details`)
      fs.writeFileSync('errors.json', JSON.stringify(error, null, '\t'))
      process.exit(1)
    }

    if (++i < l - 1) {
      await RunFlag(i)
    }
  }

  await RunFlag()

  process.exit()
})()