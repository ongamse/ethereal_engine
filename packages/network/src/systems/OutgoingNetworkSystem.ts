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

import { Engine } from '@etherealengine/ecs/src/Engine'
import { defineQuery } from '@etherealengine/ecs/src/QueryFunctions'
import { defineSystem } from '@etherealengine/ecs/src/SystemFunctions'
import { SimulationSystemGroup } from '@etherealengine/ecs/src/SystemGroups'
import { Network } from '../Network'
import { NetworkObjectAuthorityTag, NetworkObjectComponent } from '../NetworkObjectComponent'
import { NetworkState } from '../NetworkState'
import { createDataWriter } from '../serialization/DataWriter'
import { ecsDataChannelType } from './IncomingNetworkSystem'

/***********
 * QUERIES *
 **********/

export const networkQuery = defineQuery([NetworkObjectComponent, NetworkObjectAuthorityTag])

const serializeAndSend = (serialize: ReturnType<typeof createDataWriter>) => {
  const ents = networkQuery()
  if (ents.length > 0) {
    const network = NetworkState.worldNetwork as Network
    const peerID = Engine.instance.peerID
    const data = serialize(network, peerID, ents)

    // todo: insert historian logic here

    if (data.byteLength > 0) {
      // side effect - network IO
      // delay until end of frame
      Promise.resolve().then(() => network.transport.bufferToPeer(ecsDataChannelType, peerID, network.hostPeerID, data))
    }
  }
}

const serialize = createDataWriter()

const execute = () => {
  NetworkState.worldNetwork && serializeAndSend(serialize)
}

export const OutgoingNetworkSystem = defineSystem({
  uuid: 'ee.engine.OutgoingNetworkSystem',
  insert: { after: SimulationSystemGroup },
  execute
})
