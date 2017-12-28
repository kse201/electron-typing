'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer'
import Timer from '../src/timer'

describe('Timer', () => {
  describe('unit test', () => {
    const subject = new Timer({limit: 1})

    it ('is live', () => {
      expect(subject.state.isLive).toBeTruthy()
    })
  })

  describe('render', () => {
    describe('new', () => {
      it('test', () => {
        const timer = TestRenderer.create(<Timer limit='1'/>)
        const root = timer.root

        expect(root.findByType(Timer).props.limit).toEqual('1')
      })
    })
  })
})
