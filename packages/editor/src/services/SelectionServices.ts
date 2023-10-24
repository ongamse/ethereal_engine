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

import { removeComponent, setComponent } from '@etherealengine/engine/src/ecs/functions/ComponentFunctions'
import { entityExists } from '@etherealengine/engine/src/ecs/functions/EntityFunctions'
import { EntityOrObjectUUID } from '@etherealengine/engine/src/ecs/functions/EntityTree'
import { defineSystem } from '@etherealengine/engine/src/ecs/functions/SystemFunctions'
import { SelectTagComponent } from '@etherealengine/engine/src/scene/components/SelectTagComponent'
import { defineState, getMutableState, useHookstate } from '@etherealengine/hyperflux'

import { useEffect } from 'react'
import { cancelGrabOrPlacement } from '../functions/cancelGrabOrPlacement'
import { filterParentEntities } from '../functions/filterParentEntities'

export const SelectionState = defineState({
  name: 'SelectionState',
  initial: {
    selectedEntities: [] as EntityOrObjectUUID[],
    selectedParentEntities: [] as EntityOrObjectUUID[]
  },
  updateSelection: (selectedEntities: EntityOrObjectUUID[]) => {
    getMutableState(SelectionState).merge({
      selectedEntities: selectedEntities,
      selectedParentEntities: filterParentEntities(selectedEntities)
    })
  }
})

const reactor = () => {
  const selectedEntities = useHookstate(getMutableState(SelectionState).selectedEntities)

  useEffect(() => {
    cancelGrabOrPlacement()
    const entities = [...selectedEntities.value]
    for (const entity of entities) {
      if (typeof entity !== 'number' || !entityExists(entity)) continue
      setComponent(entity, SelectTagComponent)
    }

    return () => {
      for (const entity of entities) {
        if (typeof entity !== 'number' || !entityExists(entity)) continue
        removeComponent(entity, SelectTagComponent)
      }
    }
  }, [selectedEntities.length])

  return null
}

export const EditorSelectionReceptorSystem = defineSystem({
  uuid: 'ee.engine.EditorSelectionReceptorSystem',
  reactor
})
