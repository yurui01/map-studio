import fs from 'fs'
import { lstat } from 'node:fs/promises'
import { cwd } from 'node:process'
import Papa from 'papaparse'
import { ipcRenderer } from 'electron'
import { notifications } from '@mantine/notifications'
import { apsFullMsg } from '../../proto/aps_msgs'
import { IProject } from '@/types/project'
import { useProject } from '@/zustand/useProject'

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

const loadFootprintCSV = (path: string) => {
  const csvFile = fs.readFileSync(path, 'utf-8')
  const csvData = Papa.parse(csvFile, { header: false })

  return csvData.data.map((row: any) => {
    return {
      id: row[0] as string,
      timestamp: row[1] as string,
      position: [
        parseFloat(row[2]),
        parseFloat(row[3]),
        parseFloat(row[4])
      ] as [number, number, number],
      orientation: [
        parseFloat(row[5]),
        parseFloat(row[6]),
        parseFloat(row[7]),
        parseFloat(row[8])
      ] as [number, number, number, number]
    }
  })
}

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
    console.log(isRawProject)
    // 3. if raw project, convert to project
    if (isRawProject) {
      const msg = apsFullMsg
        .encode({
          topicName: '/aps/convert/import/set',
          topicType: 0,
          convertImportParam: {
            dataDir: result,
            amapName: isAMAP,
            bagName: '',
            imgInfoFileName: '',
            cfgName: ''
          }
        })
        .finish()

      // start loading

      // send convert project message
      ipcRenderer
        .invoke('convert-project', JSON.stringify(apsFullMsg.decode(msg)))
        .then((result) => {
          // stop loading
        })
      return
    } else {
      // 4. if not raw project, load it

      const footprint = loadFootprintCSV(`${result}/pose.csv`)
      console.log(footprint)
      const project: IProject = {
        name: projectName,
        path: result,
        footprint,
        pointcloud: '',
        video: ''
      }

      // set project
      useProject.getState().setProject(project)
    }
  })
}
