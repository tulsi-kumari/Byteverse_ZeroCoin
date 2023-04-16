import styled from 'styled-components';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import Image from 'next/image';

 const HLeft = () => {
  return (
    <HLeftWrap>
        <Heading>
          <EngineeringOutlinedIcon/> TCC
        </Heading>
    </HLeftWrap>
  )
}
 const Heading=styled.h1`
    font-family: 'Macondo';
    font-size: x-large;
    font-weight: bold;
    
 `
 const HLeftWrap=styled.div`
   
   
   margin-left: 10px ;
 `

//  const EngineeringOutlinedIcon=styled.div`
//      width: 400;
//  `


export default HLeft;