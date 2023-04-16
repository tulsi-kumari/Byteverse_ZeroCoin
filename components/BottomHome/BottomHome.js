import React from 'react'
import styled from 'styled-components'
import BottomHomeLeft from './Components/BottomHomeLeft'
import BottomHomeRight from './Components/BottomHomeRight'

const BottomHome = () => {
  return (
    <BottomHomeWrap>
    <BottomHomeLeft/>
    <BottomHomeRight/>
    
</BottomHomeWrap>
)
}

const BottomHomeWrap=styled.section`
display: flex;
justify-content: center;
padding-bottom: 20%;

`

export default BottomHome