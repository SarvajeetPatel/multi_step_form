import { Formik } from 'formik'
import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function WorkExperience() {
  function handleWork(e, values, form) {
    if (e.target.value && values.work.length === 0) {
      values.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    }
    form.setFieldValue('work', values.work)
  }

  function handleExp(e, values, form, i) {
    const { name, value } = e.target;
    if (name === 'jobTitle') {
      values.work[i].jobTitle = value;
    } else {
      values.work[i].name = value;
    }
    form.setFieldValue('work', values.work)
  }

  function handleStartDate(date, values, form, i) {
    values.work[i].startDate = date
    form.setFieldValue('work', values.work)
  }

  function handleEndDate(date, values, form, i) {
    values.work[i].endDate = date
    form.setFieldValue('work', values.work)
  }

  return (
    <>
      <Formik
        initialValues={{
          designation: '', work: []
        }}
        onSubmit={(values) => {
          console.log(values)
          localStorage.setItem('Work Experience', JSON.stringify(values))
        }}
      >
        {
          ({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <h2> Work Experience! </h2> <br />

              <h4>Are you a fresher or experienced? </h4>
              <input type='radio' name='designation' value='fresher' onChange={handleChange} />
              <label>Fresher</label>
              <input type='radio' name='designation' value='experienced' onChange={e => { handleChange(e); handleWork(e, values, { setFieldValue }) }} />
              <label>Experienced</label><br /><br />

              {
                (values.designation === 'experienced') &&
                values.work.map((userData, i) => (
                  <>
                    <label>Organisation Name : </label>
                    <input type='text' name='name' value={userData.name} onChange={e => handleExp(e, values, { setFieldValue }, i)} /><br /><br />

                    <label> Starting Date : </label>
                    <DatePicker name='startDate' selected={userData.startDate} onChange={(date) => handleStartDate(date, values, { setFieldValue }, i)} /><br /><br />

                    <label> Completion Date : </label>
                    <DatePicker name='endDate' selected={userData.endDate} onChange={(date) => handleEndDate(date, values, { setFieldValue }, i)} /><br /><br />

                    <label> Job Title : </label>
                    <input type='text' name='jobTitle' value={userData.jobTitle} onChange={e => handleExp(e, values, { setFieldValue }, i)}/><br /><br />
                  </>
                ))
              }
            </form>
          )
        }
      </Formik>
    </>
  )
}

export default WorkExperience