import React, { Component } from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Router from 'next/router';

export default class MenuExampleText extends Component {
  state = { activeItem: 'closest' }

  render() {

    return (
        <>
        <Menu text size='massive'>
        <Menu.Menu position='right'>
            <Menu.Item
                name='Reset'
                onClick={() => Router.pathname === '/' ? this.props.reset() : Router.push('/')}
            />
            <Menu.Item
                name='GeekTrust Home'
                onClick={() => { if(window) window.open('https://geektrust.in') }}
            />
        </Menu.Menu>
        </Menu>
        <Header size='huge' textAlign='center'>Finding Falcone!</Header>
        </>
    )
  }
}
