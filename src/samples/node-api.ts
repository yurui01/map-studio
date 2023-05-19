import { lstat } from 'node:fs/promises'
import { cwd } from 'node:process'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import { notifications } from '@mantine/notifications'

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

lstat(cwd())
  .then((stats) => {
    console.log('[fs.lstat]', stats)
  })
  .catch((err) => {
    console.error(err)
  })

export const openProject = () => {
  ipcRenderer.invoke('open-project').then((result) => {
    console.log('[open-project]', result)

    // 1. judgment if result is exist in file system
    if (!fs.existsSync(result)) return

    const projectName = result.split('/').pop()
    const projectFiles = fs.readdirSync(result)

    const isAMAP = projectFiles.find((file) => file.endsWith('.amap'))
    const isAMX = projectFiles.find((file) => file.endsWith('.amx'))

    if (!isAMAP || !isAMX) {
      notifications.show({
        title: '错误',
        message: '项目文件不完整',
        color: 'red',
        autoClose: 5000
      })
      return
    }
    // 2. judgment is raw project or not

    // if result/potree directory exist, it is not raw project
    const isRawProject = !fs.existsSync(`${result}/potree`)

    // 3. if raw project, convert to project
    if (isRawProject) {
      ipcRenderer.invoke('convert-project', result).then((result) => {
        console.log('[convert-project]', result)
      })
      return
    } else {
      // 4. if not raw project, load it
      
    }
  })
}
