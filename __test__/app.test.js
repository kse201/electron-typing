import App from '../src/app'
import React from 'react'
import { mount } from 'enzyme'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe ('App', () => {
  function setup () {
    const wrapper = mount(<App />)
    const btn = wrapper.find('.btn')
    const curWord = wrapper.find('.currentWord')
    const inputWord = wrapper.find('.inputWord')
    const app = wrapper.find('.App')

    return {
      wrapper,
      app,
      btn,
      curWord,
      inputWord
    }
  }

  describe ('initalize', () => {
    it ('should be plane', () => {
      const { btn, curWord } = setup()

      expect(btn.text()).toBe('click to start')
      expect(curWord.text()).toBe('')
    })
  })

  describe ('click', () => {
    it('should be started', () => {
      const { btn, curWord } = setup()

      btn.simulate('click')

      expect(btn.text()).toBe('')
      expect(curWord.text()).not.toBe('')
    })
  })

  describe ('keyup event', () => {
    it('input key', () => {
      const { btn, app, inputWord } = setup()

      btn.simulate('click')

      const word = inputWord.text()
      app.simulate('keyUp', {
        target: {
          key: 'c'
        }
      })
      expect(word).toEqual('c')
    })

    it('continue next word', () => {
      const { btn, app, curWord } = setup()

      btn.simulate('click')
      const word = curWord.text()
      app.simulate('keyUp', {
        target: {
          key: word
        }
      })
      expect(curWord.text()).not.toEqual(word)
    })
  })
})
