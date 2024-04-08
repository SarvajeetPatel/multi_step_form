import React from 'react'
import LanguageList from '../components/LanguageList'
import Multiselect from 'multiselect-react-dropdown'
import { useFormikContext } from 'formik'

function Skills() {
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  return (
    <>
      <h2> Your Skills! </h2>
      <label> Please Choose Your Industry : </label>
      <select name='skills.industry' onChange={(e) => { handleChange(e); setFieldValue('skills.skills', []) }}  defaultValue={values.skills.industry} >
        <option value='' disabled selected hidden> Select One Industry </option>
        <option value='Engineering'> Engineering </option>
        <option value='Finance'> Finance </option>
        <option value='Arts'> Arts </option>
        <option value='Commerce'> Commerce </option>
      </select>
      <div className='validate'> {errors?.skills?.industry} </div>
      {(values.skills.industry !== "Finance" && values.skills.industry) &&
        <>
          <Multiselect options={LanguageList[values.skills.industry]} selectedValues={values.skills.skills}
            onSelect={(selectedList) => setFieldValue('skills.skills', selectedList)}
            onRemove={(selectedList) => setFieldValue('skills.skills', selectedList)}
            displayValue="label"
            selectionLimit={5}
            showCheckbox />
          <div className='validate'> {errors?.skills?.skills}</div>
        </>
      }
    </>
  )
}

export default Skills