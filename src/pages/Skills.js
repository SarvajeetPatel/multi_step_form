import React, { useContext } from 'react'
import LanguageList from '../components/LanguageList'
import Multiselect from 'multiselect-react-dropdown'
import { useFormikContext } from 'formik'
// import NoteContext from '../context/NoteContext'
// import * as yup from 'yup'

function Skills() {
  const { values, handleChange, setFieldValue } = useFormikContext();
  // const yupValid = yup.object().shape({
  //   industry: yup.string().required('Select an industry'),
  //   skills: yup.array().of(
  //     yup.object().shape({
  //       label: yup.string().when('industry', {
  //         is: 'Finance',
  //         then: yup.string(),
  //         otherwise: yup.string().required('Choose any skill')
  //       })
  //     })
  //   )
  // })
  return (
    <>
      <h2> Your Skills! </h2>
      <label> Please Choose Your Industry : </label>
      <select name='skills.industry' onChange={handleChange} defaultChecked={values.skills.industry} defaultValue={values.skills.industry} >
        <option value='' disabled selected hidden> Select One Industry </option>
        <option value='Engineering'> Engineering </option>
        <option value='Finance'> Finance </option>
        <option value='Arts'> Arts </option>
        <option value='Commerce'> Commerce </option>
      </select>
      {/* <div className='validate'> {errors.industry} </div> */}
      {values.skills.industry &&
        <Multiselect options={LanguageList[values.skills.industry]} selectedValues={values.skills.skills}
          onSelect={(selectedList) => setFieldValue('skills.skills', selectedList)}
          onRemove={(selectedList) => setFieldValue('skills.skills', selectedList)}
          displayValue="label"
          disable={values.skills.skills.length >= 5}
          showCheckbox />
      }
      {/* <div> {errors?.skills}</div> */}
    </>
  )
}

export default Skills