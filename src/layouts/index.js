import React from 'react'
import Wrapper from '../components/wrapper'
import Header from '../components/header/header'

export default ({ children }) => (
  <Wrapper>
    <Header />
    Noah Allen
    {children()}
  </Wrapper>
);