import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeft = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeftWrap>
      <FormInput>
        <label>PROJECT ID</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.projectId} placeholder='Enter Project Id Here' name='projectId'>
        </Input>
      </FormInput>
      <FormInput>
        <label>PROJECT NAME</label>
        <Input onChange={Handler.FormHandler} value={Handler.form._projectName} placeholder='Enter Project Name Here' name='_projectName'>
        </Input>
      </FormInput>
      <FormInput>
        <label>APPROXIMATE DEADLINE</label>
        <Input  type="date" placeholder='DD-MM-YYYY' name='deadline'>
        </Input>
      </FormInput>
    </FormLeftWrap>
  )
}

const FormLeftWrap = styled.div`
  width:25%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`
const Input = styled.input`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:large;
  width:100% ;
`


export default FormLeft;