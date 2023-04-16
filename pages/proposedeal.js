import Form from "@/components/Form/Form";
import styled from "styled-components";

 const proposedeal = () => {
  return (
    <FormWrapper>
      <FormTopWrap>
        <Paragraph> Presenting our</Paragraph>
        <Heading>CONTRACT FORM</Heading>
        <Text><Paragraph>Just fill this form to go from loads of paperwork to a simple digital form</Paragraph></Text>
        <Text><Paragraph>Enter the  details of the contract to start a deal with the government itself just in few clicks</Paragraph></Text>
        <Caption>
            THE RIGHT TECHNOLOGY CAN MAKE A DIFFERENCE
            
        </Caption>
        <Text><Paragraph>Please fill up the details very carefully.Every field is mandatory. </Paragraph></Text>
       
        
    </FormTopWrap>  
      <Form />
    </FormWrapper>
  )
}



const Text=styled.p`
  margin-top: 0;
`
const TopLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
   color:${(props) => props.theme.btnColor} ;
`
const Heading=styled.h1`
   font-family: 'Oswald';
   font-size:3.5rem;
   font-weight: 400;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
   justify-content: center;
   align-items: center;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const FormWrapper=styled.div`

    padding-top: 9rem;
    
`
const FormTopWrap=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default proposedeal