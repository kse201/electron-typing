'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer'
import App from '../src/app'

describe('App', () => {
  function setup() {
    const renderer = TestRenderer.create(<App />)
    const app = renderer.root
    return {
      renderer,
      app
    }
  }

  describe('new', () => {
    const {app} = setup()

    expect(app.instance.state.isLive).toBeFalsy()
  })

  describe('click', () => {
    it('should start', () => {
      const {renderer, app} = setup()

      ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithClass(app, 'App'))
      expect(app.instance.state.isLive).toBeTruthy()
    })
  })

  describe('test', () => {
    it('should start', () => {
      const tree = ReactTestUtils.renderIntoDocument(<App />)

      let subject = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'App')
      expect(ReactTestUtils.isDOMComponent(subject)).toBeTruthy()
      ReactTestUtils.Simulate.click(subject)

      expect(subject.instance.state.isLive).toBeTruthy()
    })
  })
})
