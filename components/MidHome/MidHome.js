import React from 'react'
import styled from 'styled-components'
import MidHomeLeft from './Components/MidHomeLeft'
import MidHomeRight from './Components/MidHomeRight'

const MidHome = () => {
  return (
    <MidHomeWrap >
      <MidHomeRight/>
        <MidHomeLeft/>
        
    </MidHomeWrap>
  )
}
const MidHomeWrap=styled.section`
    display: flex;
    justify-content: center;
    padding-bottom: 20%;
    
`

export default MidHome