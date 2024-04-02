import { Formik } from 'formik'
import React, { useContext } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import NoteContext from '../context/NoteContext'
import * as yup from 'yup'

function WorkExperience({ handleNext }) {
  const { workExp, setWorkExp } = useContext(NoteContext);

  function handleWork(e, values, form) {
    if (e.target.value && values.work.length === 0) {
      values.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    }
    form.setFieldValue('work', values.work)
  }

  function handleExp(e, values, form, i) {
    console.log(i, "index", values.work)
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

  function handleNewWork(e, values, { setFieldValue }) {
    values.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    setFieldValue('work', values.work)
  }

  const yupValidate = yup.object().shape({
    designation: yup.string().required('Please select designation'),
    work: yup.array().of(
      yup.object().shape({
        name: yup.string().when('designation', {
          is: 'experienced',
          then: yup.string().required('Enter name'),
          otherwise: yup.string()
        }),
        startDate: yup.string().when('designation', {
          is: 'experienced',
          then: yup.string().required('Enter startDate'),
          otherwise: yup.string()
        }),
        endDate: yup.string().when('designation', {
          is: 'experienced',
          then: yup.string().required('Enter endDate'),
          otherwise: yup.string()
        }),
        jobTitle: yup.string().when('designation', {
          is: 'experienced',
          then: yup.string().required('Enter jobTitle'),
          otherwise: yup.string()
        })
      })
    )
  })

  return (
    <>
      <Formik
        initialValues={{
          designation: workExp.designation || '', work: workExp.work || []
        }}
        onSubmit={(values) => {
          console.log(values)
          setWorkExp(values)
          handleNext(values)
        }}
        validateOnChange={false}
        validationSchema={yupValidate}
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
              <div className='validate'> {errors.designation}</div>
              {
                (values?.designation === 'experienced') &&
                values.work.map((i) => (
                  <>
                    <label>Organisation Name : </label>
                    <input type='text' name='name' value={values?.work[i]?.name} onChange={e => handleExp(e, values, { setFieldValue }, i)} /><br /><br />
                    <div className='validate'> {errors?.work?.[i]?.name} </div>

                    <label> Starting Date : </label>
                    <DatePicker name='startDate' selected={values?.work[i]?.startDate} onChange={(date) => handleStartDate(date, values, { setFieldValue }, i)} /><br /><br />
                    <div className='validate'> {errors?.work?.[i]?.startDate}</div>

                    <label> Completion Date : </label>
                    <DatePicker name='endDate' selected={values?.work[i]?.endDate} onChange={(date) => handleEndDate(date, values, { setFieldValue }, i)} /><br /><br />
                    <div className='validate'> {errors?.work?.[i]?.endDate}</div>

                    <label> Job Title : </label>
                    <input type='text' name='jobTitle' value={values?.work[i]?.jobTitle} onChange={e => handleExp(e, values, { setFieldValue }, i)} /><br /><br />
                    <div className='validate'> {errors?.work?.[i]?.jobTitle}</div>
                  </>
                ))
              }
              {values.work.length > 0 &&
                <button type='button' onClick={e => handleNewWork(e, values, { setFieldValue })}> ADD MORE </button>
              }

              <br /><button type='button' onClick={handleSubmit}> SAVE </button>
            </form>
          )
        }
      </Formik>
    </>
  )
}

export default WorkExperience