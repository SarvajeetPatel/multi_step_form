import { Formik } from 'formik'
import React, { useContext } from 'react'
import LanguageList from '../components/LanguageList'
import Multiselect from 'multiselect-react-dropdown'
import NoteContext from '../context/NoteContext'
import * as yup from 'yup'

function Skills({ handleNext }) {
  const { skills, setSkills } = useContext(NoteContext);
  const yupValid = yup.object().shape({
    industry: yup.string().required('Select an industry'),
    skills: yup.array().of(
      yup.object().shape({
        label: yup.string().when('industry', {
          is: 'Finance',
          then: yup.string(),
          otherwise: yup.string().required('Choose any skill')
        })
      })
    )
  })
  return (
    <>
      <Formik
        initialValues={{
          industry: skills.industry || '', skills: skills.skills || []
        }}
        onSubmit={(values) => {
          console.log(values)
          setSkills(values)
          handleNext(values)
        }}
        validateOnChange={false}
        validationSchema={yupValid}
      >
        {
          ({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <h2> Your Skills! </h2>
              <label> Please Choose Your Industry : </label>
              <select name='industry' onChange={e => { handleChange(e); setFieldValue('industry', e.target.value); }}>
                <option value='' disabled selected hidden> Select One Industry </option>
                <option value='Engineering'> Engineering </option>
                <option value='Finance'> Finance </option>
                <option value='Arts'> Arts </option>
                <option value='Commerce'> Commerce </option>
              </select>
              <div className='validate'> {errors.industry} </div>
              {values.industry &&
                <Multiselect options={LanguageList[values.industry]} selectedValues={values.skills}
                  onSelect={(selectedList) => setFieldValue('skills', selectedList)}
                  onRemove={(selectedList) => setFieldValue('skills', selectedList)}
                  displayValue="label"
                  showCheckbox />
              }
              <div> {errors?.skills}</div>
              <br /><button type='submit'> SAVE </button>
            </form>
          )
        }
      </Formik>
    </>
  )
}

export default Skills