/// <reference path="../../../typings/es6/lib.es6.d.ts" />

/// <reference path="../../../typings/angular2/angular2.d.ts" />
/// <reference path="../../../typings/dotcms/dotcms-core-web.d.ts" />
/// <reference path="../../../typings/entity-forge/entity-forge.d.ts" />


import {NgFor, NgIf, Component, Directive, View} from 'angular2/angular2';
import {ConditionComponent} from './rule-condition-component';

import conditionGroupTemplate from './templates/rule-condition-group-component.tpl.html!text'


@Component({
  selector: 'condition-group',
  properties: [
    "rule",
    "groupSnap"
  ]
})
@View({
  template: conditionGroupTemplate,
  directives: [ConditionComponent, NgIf, NgFor]
})
export class ConditionGroupComponent {
  _groupSnap:any;
  group:any;
  rule:any;
  groupCollapsed:boolean;
  conditions:Array<any>;

  constructor() {
    console.log('Creating ConditionGroupComponent')
    this.groupCollapsed = false
    this.conditions = []
  }

  set groupSnap(groupSnap) {
    console.log('Setting ConditionGroup snapshot: ', groupSnap.key())
    this._groupSnap = groupSnap
    this.group = groupSnap.val()
    this.conditions = this.getConditions()
  }

  get groupSnap() {
    return this._groupSnap;
  }

  getConditions() {
    let referenceSnaps = []
    let conditionMetas = []
    this.groupSnap.child('conditions').forEach((childSnap) => {
      let key = childSnap.key()
      let childMeta = childSnap['entityMeta']
      referenceSnaps.push(key) // the snap value is 'true', as this is a reference.
      conditionMetas.push(new EntityMeta('/api/v1/sites/48190c8c-42c4-46af-8d1a-0cd5db894797/ruleengine/conditions/' + key))
    })
    return conditionMetas
  }

  addCondition() {
    console.log('Adding condition to ConditionsGroup')
    let condition = {
      priority: 10,
      name: "Condition. " + new Date().toISOString(),
      owningGroup: this._groupSnap.key(),
      conditionlet: 'UsersCountryConditionlet',
      comparison: 'Is',
      operator: 'AND',
      values: {
        a: {
          id: 'a',
          value: 'US',
          priority: 10
        }
      }
    }
    let condRoot:EntityMeta = new EntityMeta('/api/v1/sites/48190c8c-42c4-46af-8d1a-0cd5db894797/ruleengine/conditions')

    condRoot.push(condition).then((result) => {
      this.group.conditions = this.group.conditions || {}
      this.group.conditions[result.key()] = true
      this.updateGroup()
    }).catch((e) => {
      console.log(e)
    })
  }

  toggleOperator() {
    this.group.operator = this.group.operator === "AND" ? "OR" : "AND"
    this.updateGroup()
  }

  updateGroup() {
    console.log('Updating ConditionsGroup')
    this.groupSnap.ref().set(this.group)
    this.conditions = this.getConditions()
  }

}