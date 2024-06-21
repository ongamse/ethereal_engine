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

import assert from 'assert'

import { World } from '@dimforge/rapier3d-compat'
import {
  EntityUUID,
  SystemDefinitions,
  SystemUUID,
  UUIDComponent,
  UndefinedEntity,
  createEntity,
  destroyEngine,
  getComponent,
  removeEntity,
  setComponent
} from '@etherealengine/ecs'
import { getMutableState } from '@etherealengine/hyperflux'
import { TransformComponent } from '../../SpatialModule'
import { setCallback } from '../../common/CallbackComponent'
import { createEngine } from '../../initializeEngine'
import { Physics } from '../classes/Physics'
import { ColliderComponent } from '../components/ColliderComponent'
import { RigidBodyComponent } from '../components/RigidBodyComponent'
import { TriggerComponent } from '../components/TriggerComponent'
import { PhysicsState } from '../state/PhysicsState'
import { ColliderHitEvent } from '../types/PhysicsTypes'
import { TriggerSystem, triggerEnter, triggerExit } from './TriggerSystem'

describe('TriggerSystem', () => {
  describe('IDs', () => {
    it("should define the TriggerSystem's UUID with the expected value", () => {
      assert.equal(TriggerSystem, 'ee.engine.TriggerSystem' as SystemUUID)
    })
  })

  const InvalidEntityUUID = 'dummyID-123456' as EntityUUID

  const EnterStartValue = 42 // Start testOnEnter at 42
  let enterVal = EnterStartValue
  const TestOnEnterName = 'test.onEnter'
  function testOnEnter(ent1, ent2) {
    ++enterVal
  }

  const ExitStartValue = 10_042 // Start testOnExit at 10_042
  let exitVal = ExitStartValue
  const TestOnExitName = 'test.onExit'
  function testOnExit(ent1, ent2) {
    ++exitVal
  }

  let triggerEntity = UndefinedEntity
  let targetEntity = UndefinedEntity
  let testEntity = UndefinedEntity
  let targetEntityUUID = '' as EntityUUID
  let physicsWorld: World | undefined = undefined

  beforeEach(async () => {
    createEngine()
    await Physics.load()
    physicsWorld = Physics.createWorld()
    physicsWorld!.timestep = 1 / 60
    getMutableState(PhysicsState).physicsWorld!.set(physicsWorld!)

    // Create the entity
    testEntity = createEntity()
    setComponent(testEntity, TransformComponent)
    setComponent(testEntity, RigidBodyComponent)
    setComponent(testEntity, ColliderComponent)

    targetEntity = createEntity()
    setComponent(targetEntity, UUIDComponent, UUIDComponent.generateUUID())
    setCallback(targetEntity, TestOnEnterName, testOnEnter)
    setCallback(targetEntity, TestOnExitName, testOnExit)
    targetEntityUUID = getComponent(targetEntity, UUIDComponent)

    triggerEntity = createEntity()
    setComponent(triggerEntity, TransformComponent)
    setComponent(triggerEntity, RigidBodyComponent)
    setComponent(triggerEntity, ColliderComponent)
    setComponent(triggerEntity, TriggerComponent, {
      triggers: [{ onEnter: TestOnEnterName, onExit: TestOnExitName, target: targetEntityUUID }]
    })
  })

  afterEach(() => {
    removeEntity(testEntity)
    removeEntity(triggerEntity)
    removeEntity(targetEntity)
    physicsWorld = undefined
    return destroyEngine()
  })

  describe('triggerEnter', () => {
    const Hit = {} as ColliderHitEvent // @todo The hitEvent argument is currently ignored in the function body
    describe('for all entity.triggerComponent.triggers ...', () => {
      it('... should only run if trigger.target defines the UUID of a valid entity', () => {
        setComponent(triggerEntity, TriggerComponent, {
          triggers: [{ onEnter: TestOnEnterName, onExit: TestOnExitName, target: InvalidEntityUUID }]
        })
        assert.equal(enterVal, EnterStartValue)
        triggerEnter(triggerEntity, targetEntity, Hit)
        assert.equal(enterVal, EnterStartValue)
      })

      it('... should only run if trigger.onEnter callback has a value and is part of the target.CallbackComponent.callbacks map', () => {
        const noEnterEntity = createEntity()
        setComponent(noEnterEntity, UUIDComponent, UUIDComponent.generateUUID())
        setCallback(noEnterEntity, TestOnExitName, testOnExit)
        const noEnterEntityUUID = getComponent(noEnterEntity, UUIDComponent)
        setComponent(triggerEntity, TriggerComponent, {
          triggers: [{ onEnter: null, onExit: TestOnExitName, target: noEnterEntityUUID }]
        })
        assert.equal(enterVal, EnterStartValue)
        triggerEnter(triggerEntity, targetEntity, Hit)
        assert.equal(enterVal, EnterStartValue)
      })

      it('... should run the target.CallbackComponent.callbacks[trigger.onEnter] function', () => {
        assert.equal(enterVal, EnterStartValue)
        triggerEnter(triggerEntity, targetEntity, Hit)
        assert.notEqual(enterVal, EnterStartValue)
      })
    })
  })

  describe('triggerExit', () => {
    const Hit = {} as ColliderHitEvent // @todo The hitEvent argument is currently ignored in the function body
    describe('for all entity.triggerComponent.triggers ...', () => {
      it('... should only run if trigger.target defines the UUID of a valid entity', () => {
        setComponent(triggerEntity, TriggerComponent, {
          triggers: [{ onEnter: TestOnEnterName, onExit: TestOnExitName, target: InvalidEntityUUID }]
        })
        assert.equal(exitVal, ExitStartValue)
        triggerExit(triggerEntity, targetEntity, Hit)
        assert.equal(exitVal, ExitStartValue)
      })

      it('... should only run if trigger.onExit callback has a value and is part of the target.CallbackComponent.callbacks map', () => {
        const noExitEntity = createEntity()
        setComponent(noExitEntity, UUIDComponent, UUIDComponent.generateUUID())
        setCallback(noExitEntity, TestOnExitName, testOnExit)
        const noExitEntityUUID = getComponent(noExitEntity, UUIDComponent)
        setComponent(triggerEntity, TriggerComponent, {
          triggers: [{ onEnter: TestOnEnterName, onExit: null, target: noExitEntityUUID }]
        })
        assert.equal(exitVal, ExitStartValue)
        triggerExit(triggerEntity, targetEntity, Hit)
        assert.equal(exitVal, ExitStartValue)
      })

      it('... should run the target.CallbackComponent.callbacks[trigger.onExit] function', () => {
        assert.equal(exitVal, ExitStartValue)
        triggerExit(triggerEntity, targetEntity, Hit)
        assert.notEqual(exitVal, ExitStartValue)
      })
    })
  })

  describe('execute', () => {
    const triggerSystemExecute = SystemDefinitions.get(TriggerSystem)!.execute

    /**
    // @todo Why is this still running when TriggerComponent is removed from triggerEntity?
    it("should only run for entities that have both a TriggerComponent and a CollisionComponent  (aka. collisionQuery)", () => {
      removeComponent(triggerEntity, TriggerComponent)
      assert.equal(enterVal, EnterStartValue)
      assert.equal(exitVal, ExitStartValue)
      triggerSystemExecute()
      assert.equal(exitVal, ExitStartValue)
      assert.equal(enterVal, EnterStartValue)
    })
    */

    // it("should run `triggerEnter` for all entities that match the collisionQuery and have a hit.type === CollisionEvents.TRIGGER_START", () => {})
    // it("should run `triggerExit` for all entities that match the collisionQuery and have a hit.type === CollisionEvents.TRIGGER_END", () => {})
  })
})
