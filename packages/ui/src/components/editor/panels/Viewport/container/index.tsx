/*
CPAL-1.0 License

The contents of this file are subject to the Common Public Attribution License
Version 1.0. (the "License"); you may not use this file except in compliance
with the License. You may obtain a copy of the License at
https://github.com/EtherealEngine/etherealengine/blob/dev/LICENSE.
The License is based on the Mozilla Public License Version 1.1, but Sections 14
and 15 have been added to cover use of software over a computer network and 
provide for limited attribution for the Original Developer. In addition, 
Exhibit A has been modified to be consistent with Exhibit B.

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the
specific language governing rights and limitations under the License.

The Original Code is Ethereal Engine.

The Original Developer is the Initial Developer. The Initial Developer of the
Original Code is the Ethereal Engine team.

All portions of the code written by the Ethereal Engine team are Copyright © 2021-2023 
Ethereal Engine. All Rights Reserved.
*/

import { AdminClientSettingsState } from '@etherealengine/client-core/src/admin/services/Setting/ClientSettingService'
import { useEngineCanvas } from '@etherealengine/client-core/src/hooks/useEngineCanvas'
import { SceneElementType } from '@etherealengine/editor/src/components/element/ElementList'
import { ItemTypes, SupportedFileTypes } from '@etherealengine/editor/src/constants/AssetTypes'
import { EditorControlFunctions } from '@etherealengine/editor/src/functions/EditorControlFunctions'
import { addMediaNode } from '@etherealengine/editor/src/functions/addMediaNode'
import { getCursorSpawnPosition } from '@etherealengine/editor/src/functions/screenSpaceFunctions'
import { EditorState } from '@etherealengine/editor/src/services/EditorServices'
import { useMutableState } from '@etherealengine/hyperflux'
import { TransformComponent } from '@etherealengine/spatial'
import React from 'react'
import { useDrop } from 'react-dnd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Vector2, Vector3 } from 'three'
import Text from '../../../../../primitives/tailwind/Text'
import { DnDFileType, FileType } from '../../Files/container'
import GizmoTool from '../tools/GizmoTool'
import GridTool from '../tools/GridTool'
import PlayModeTool from '../tools/PlayModeTool'
import RenderModeTool from '../tools/RenderTool'
import TransformPivotTool from '../tools/TransformPivotTool'
import TransformSnapTool from '../tools/TransformSnapTool'
import TransformSpaceTool from '../tools/TransformSpaceTool'

const ViewportDnD = () => {
  const [{ isDragging }, dropRef] = useDrop({
    accept: [ItemTypes.Component, ...SupportedFileTypes],
    collect: (monitor) => ({
      isDragging: monitor.getItem() !== null && monitor.canDrop() && monitor.isOver()
    }),
    drop(item: SceneElementType | FileType | DnDFileType, monitor) {
      const vec3 = new Vector3()
      getCursorSpawnPosition(monitor.getClientOffset() as Vector2, vec3)
      if ('componentJsonID' in item) {
        EditorControlFunctions.createObjectFromSceneElement([
          { name: item.componentJsonID },
          { name: TransformComponent.jsonID, props: { position: vec3 } }
        ])
      } else if ('url' in item) {
        addMediaNode(item.url, undefined, undefined, [{ name: TransformComponent.jsonID, props: { position: vec3 } }])
      }
    }
  })

  return (
    <div
      id="viewport-panel"
      ref={dropRef}
      className={twMerge(
        'h-full w-full border border-white',
        isDragging ? 'pointer-events-auto border-4' : 'pointer-events-none border-none'
      )}
    />
  )
}

const ViewPortPanelContainer = () => {
  const { t } = useTranslation()
  const sceneName = useMutableState(EditorState).sceneName.value
  const clientSettingState = useMutableState(AdminClientSettingsState)
  const [clientSetting] = clientSettingState?.client?.value || []

  const ref = React.useRef<HTMLDivElement>(null)

  useEngineCanvas(ref)

  return (
    <div className="relative z-30 flex h-full w-full flex-col bg-theme-surface-main">
      <div className="flex gap-1 p-1">
        <TransformSpaceTool />
        <TransformPivotTool />
        <GridTool />
        <TransformSnapTool />
        <div className="flex-1" />
        <RenderModeTool />
        <PlayModeTool />
      </div>
      {sceneName ? <GizmoTool /> : null}
      {/* canvas to render the world to, should take up full space */}
      {sceneName ? (
        <ViewportDnD />
      ) : (
        <div className="flex h-full w-full flex-col justify-center gap-2">
          <img src={clientSetting.appTitle} className="block scale-[.8]" />
          <Text className="text-center">{t('editor:selectSceneMsg')}</Text>
        </div>
      )}
      <div id="engine-renderer-canvas-container" ref={ref} className="absolute h-full w-full" />
    </div>
  )
}

export default ViewPortPanelContainer
