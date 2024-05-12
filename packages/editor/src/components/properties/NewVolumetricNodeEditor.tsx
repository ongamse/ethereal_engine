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

import { Entity, useComponent } from '@etherealengine/ecs'
import { NewVolumetricComponent } from '@etherealengine/engine/src/scene/components/NewVolumetricComponent'
import { TextureType } from '@etherealengine/engine/src/scene/constants/UVOLTypes'
import { NO_PROXY, useHookstate } from '@etherealengine/hyperflux'
import { t } from 'i18next'
import React, { useEffect } from 'react'
import { Scrubber } from 'react-scrubber'
import BooleanInput from '../inputs/BooleanInput'
import InputGroup from '../inputs/InputGroup'
import SelectInput from '../inputs/SelectInput'
import NodeEditor from './NodeEditor'
import { EditorComponentType, commitProperty } from './Util'

interface OptionsType {
  value: number
  label: string
}

export const NewVolumetricNodeEditor: EditorComponentType = (props) => {
  const component = useComponent(props.entity, NewVolumetricComponent)

  const geometryTargets = useHookstate([] as OptionsType[])
  const textureTargets = useHookstate({} as Partial<Record<TextureType, OptionsType[]>>)

  useEffect(() => {
    if (component.geometry.targets.length > 0) {
      const targetOptions = [] as OptionsType[]
      const targets = component.geometry.targets.value
      targets.forEach((target, index) => {
        targetOptions.push({ value: index, label: target })
      })
      geometryTargets.set(targetOptions)
    }
  }, [component.geometry.targets])

  useEffect(() => {
    const textureInfo = component.texture.get(NO_PROXY)
    for (const [textureType, textureTypeInfo] of Object.entries(textureInfo)) {
      const targetOptions = [] as OptionsType[]
      const targets = textureTypeInfo.targets
      targets.forEach((target, index) => {
        targetOptions.push({ value: index, label: target })
      })
      textureTargets.merge({
        [textureType as TextureType]: targetOptions
      })
    }
  }, [component.texture])

  return (
    <NodeEditor
      {...props}
      name={t('editor:properties.volumetric.name')}
      description={t('editor:properties.volumetric.description')}
    >
      <InputGroup name="useLoadingEffect" label={t('editor:properties.volumetric.lbl-useLoadingEffect')}>
        <BooleanInput
          onChange={commitProperty(NewVolumetricComponent, 'useLoadingEffect')}
          value={component.useLoadingEffect.value}
        />
      </InputGroup>

      {component.geometry.targets.length > 0 && (
        <InputGroup name="Geometry Target" label="Geometry Target">
          <SelectInput
            key={props.entity}
            options={geometryTargets.value}
            value={
              component.geometry.userTarget.value === -1
                ? component.geometry.currentTarget.value
                : component.geometry.userTarget.value
            }
            onChange={(value: number) => {
              component.geometry.userTarget.set(value)
            }}
          />
        </InputGroup>
      )}

      {textureTargets.value &&
        Object.keys(textureTargets.value).map((textureType) => {
          const userTarget = component.texture[textureType as TextureType].value?.userTarget ?? -1
          const currentTarget = component.texture[textureType as TextureType].value?.currentTarget ?? 0
          const value = userTarget === -1 ? currentTarget : userTarget

          return (
            <InputGroup name={`${textureType} targets`} label={`${textureType} targets`}>
              <SelectInput
                key={props.entity}
                options={textureTargets.value[textureType]}
                value={value}
                onChange={(value: number) => {
                  component.texture[textureType as TextureType].merge({
                    userTarget: value
                  })
                }}
              />
            </InputGroup>
          )
        })}

      <TimeScrubber entity={props.entity} />
    </NodeEditor>
  )
}

function TimeScrubber(props: { entity: Entity }) {
  const component = useComponent(props.entity, NewVolumetricComponent)
  return (
    component.manifest.value && (
      <InputGroup name="Current Time" label="Current Time">
        <Scrubber
          min={0}
          max={component.time.duration.value}
          value={component.time.currentTime.value / 1000}
          bufferPosition={component.time.bufferedUntil.value / 1000}
          tooltip={{
            enabledOnHover: true
          }}
        />
      </InputGroup>
    )
  )
  return null
}
