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

import React from 'react'
import { useTranslation } from 'react-i18next'

import { useComponent } from '@etherealengine/ecs/src/ComponentFunctions'

import { FaRegFaceFlushed } from 'react-icons/fa6'

import { EntityUUID } from '@etherealengine/ecs'
import { EditorComponentType, commitProperty } from '@etherealengine/editor/src/components/properties/Util'
import { FacerComponent } from '@etherealengine/spatial/src/transform/components/FacerComponent'
import BooleanInput from '../../input/Boolean'
import InputGroup from '../../input/Group'
import NodeInput from '../../input/Node'
import NodeEditor from '../nodeEditor'

/**
 * FacerNodeEditor component used to customize the facer element on the scene
 */
export const FacerNodeEditor: EditorComponentType = (props) => {
  const { t } = useTranslation()

  const facerComponent = useComponent(props.entity, FacerComponent)

  return (
    <NodeEditor
      entity={props.entity}
      component={FacerComponent}
      name={t('editor:properties.facer.name')}
      description={t('editor:properties.facer.description')}
    >
      <InputGroup name="Target" label={t('editor:properties.facer.target')}>
        <NodeInput
          value={facerComponent.target.value ?? ('' as EntityUUID)}
          onRelease={commitProperty(FacerComponent, 'target')}
          onChange={commitProperty(FacerComponent, 'target')}
        />
      </InputGroup>
      <InputGroup name="X Axis" label={t('editor:properties.facer.xAxis')}>
        <BooleanInput value={facerComponent.xAxis.value} onChange={commitProperty(FacerComponent, 'xAxis')} />
      </InputGroup>
      <InputGroup name="Y Axis" label={t('editor:properties.facer.yAxis')}>
        <BooleanInput value={facerComponent.yAxis.value} onChange={commitProperty(FacerComponent, 'yAxis')} />
      </InputGroup>
    </NodeEditor>
  )
}

FacerNodeEditor.iconComponent = FaRegFaceFlushed

export default FacerNodeEditor
