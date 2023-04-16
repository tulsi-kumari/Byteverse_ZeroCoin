import styled from 'styled-components';
import Left from './components/HLeft';
import Nav from './components/HNav';
import Right from './components/HRight';

const Header = () => {
   

  return (
    <HeaderWrap id='nav' >
      
      <Nav ></Nav>
      <Right></Right>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.div`


  position: fixed;
  width: 100%;
  height: 7rem;
  display: flex;
  flex-direction: row;
  background-color: ${(props)=>props.theme.detail};
  justify-content: space-between;
  align-items: center;
  
`

export default Header