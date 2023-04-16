import React from 'react'
import  Top  from '../components/Top/Top';
import styled from 'styled-components';
import MidHome from '../components/MidHome/MidHome';
import BottomHome from '../components/BottomHome/BottomHome';

const index = () => {
  return (
    <Wrap>
    <Top/>
    <MidHome/> 
     <BottomHome/>
    </Wrap>
  )
}
const Wrap=styled.div`

`
export default index