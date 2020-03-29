import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'
import Result from '../pages/result';

it('renders index unchanged', () => {
  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders result unchanged', () => {
    const tree = renderer.create(<Result />).toJSON()
    expect(tree).toMatchSnapshot()
})