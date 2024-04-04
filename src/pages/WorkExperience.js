import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useFormikContext } from 'formik'
// import NoteContext from '../context/NoteContext'
// import * as yup from 'yup'

function WorkExperience() {
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  function handleWork(e, values, form) {
    if (e.target.value && values.workExp?.work?.length === 0) {
      values.workExp.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    }
    form.setFieldValue('workExp.work', values.workExp.work)
  }

  function handleNewWork(e, values, { setFieldValue }) {
    values.workExp.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    setFieldValue('workExp.work', values.workExp.work)
  }

  // const yupValidate = yup.object().shape({
  //   designation: yup.string().required('Please select designation'),
  //   work: yup.array().of(
  //     yup.object().shape({
  //       name: yup.string().when('designation', {
  //         is: 'experienced',
  //         then: yup.string().required('Enter name'),
  //         otherwise: yup.string()
  //       }),
  //       startDate: yup.string().when('designation', {
  //         is: 'experienced',
  //         then: yup.string().required('Enter startDate'),
  //         otherwise: yup.string()
  //       }),
  //       endDate: yup.string().when('designation', {
  //         is: 'experienced',
  //         then: yup.string().required('Enter endDate'),
  //         otherwise: yup.string()
  //       }),
  //       jobTitle: yup.string().when('designation', {
  //         is: 'experienced',
  //         then: yup.string().required('Enter jobTitle'),
  //         otherwise: yup.string()
  //       })
  //     })
  //   )
  // })

  return (
    <>
      <h2> Work Experience! </h2> 

      <h4>Are you a fresher or experienced? </h4>
      <input type='radio' name='workExp.designation' value='fresher' onChange={handleChange} defaultChecked={values.workExp.designation === 'fresher'} />
      <label>Fresher</label>
      <input type='radio' name='workExp.designation' value='experienced' onChange={e => { handleChange(e); handleWork(e, values, { setFieldValue }) }} defaultChecked={values.workExp.designation === 'experienced'} />
      <label>Experienced</label><br /><br />
      <div className='validate'> {errors?.workExp?.designation}</div>
      {
        (values.workExp?.designation === 'experienced') &&
        values.workExp.work.map((work, i) => (
          <>
            <label>Organisation Name : </label>
            <input type='text' name={`workExp.work[${i}].name`} value={values.workExp?.work[i]?.name} onChange={handleChange} /><br /><br />
            <div className='validate'> {errors?.workExp?.work?.[i]?.name} </div>

            <label> Starting Date : </label>
            <DatePicker name={`workExp.work[${i}].startDate`} selected={values.workExp?.work[i]?.startDate} onChange={(date) => setFieldValue(`workExp.work[${i}].startDate`, date)} /><br /><br />
            <div className='validate'> {errors?.workExp?.work?.[i]?.startDate}</div>

            <label> Completion Date : </label>
            <DatePicker name={`workExp.work[${i}].endDate`} selected={values.workExp?.work[i]?.endDate} onChange={(date) => setFieldValue(`workExp.work[${i}].endDate`, date)} /><br /><br />
            <div className='validate'> {errors?.workExp?.work?.[i]?.endDate}</div>

            <label> Job Title : </label>
            <input type='text' name={`workExp.work[${i}].jobTitle`} value={values.workExp?.work[i]?.jobTitle} onChange={handleChange} /><br /><br />
            <div className='validate'> {errors?.workExp?.work?.[i]?.jobTitle}</div>
          </>
        ))
      }
      {values.workExp?.designation === 'experienced' &&
        <button type='button' onClick={e => handleNewWork(e, values, { setFieldValue })}> ADD MORE </button>
      }

    </>
  )
}

export default WorkExperience