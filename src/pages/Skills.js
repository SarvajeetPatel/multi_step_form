import { Formik } from 'formik'
import React from 'react'
import LanguageList from '../components/LanguageList'
import Multiselect from 'multiselect-react-dropdown'

function Skills() {

  return (
    <>
      <Formik
        initialValues={{
          industry: '', skills: []
        }}
        onSubmit={(values) => {
          console.log(values)
          localStorage.setItem('Skills', JSON.stringify(values))
        }}
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
              {values.industry &&
                <Multiselect options={LanguageList[values.industry]} selectedValues={values.skills}
                  onSelect={(selectedList) => setFieldValue('skills', selectedList)}
                  onRemove={(selectedList) => setFieldValue('skills', selectedList)}
                  displayValue="label"
                  showCheckbox />
              }
            </form>
          )
        }
      </Formik>
    </>
  )
}

export default Skills