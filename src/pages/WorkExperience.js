import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useFormikContext } from 'formik'

function WorkExperience() {
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  function handleWork(e, values, form) {
    if (e.target.value && values.workExp?.work?.length === 0) {
      values.workExp.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    }
    form.setFieldValue('workExp.work', values.workExp.work)
  }

  function handleNewWork(values, { setFieldValue }) {
    values.workExp.work.push({ name: '', startDate: '', endDate: '', jobTitle: '' })
    setFieldValue('workExp.work', values.workExp.work)
  }
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
            <input type='text' name={`workExp.work[${i}].name`} value={values.workExp?.work[i]?.name} onChange={handleChange} />
            <div className='validate'> {errors?.workExp?.work?.[i]?.name} </div><br />

            <label> Starting Date : </label>
            <DatePicker name={`workExp.work[${i}].startDate`} showIcon selected={values.workExp?.work[i]?.startDate} onChange={(date) => setFieldValue(`workExp.work[${i}].startDate`, date)} />
            <div className='validate'> {errors?.workExp?.work?.[i]?.startDate}</div><br />

            <label> Completion Date : </label>
            <DatePicker name={`workExp.work[${i}].endDate`} showIcon minDate={values.workExp?.work[i]?.endDate} disabled={!values.workExp.work[i].startDate} selected={values.workExp?.work[i]?.endDate} onChange={(date) => setFieldValue(`workExp.work[${i}].endDate`, date)} />
            <div className='validate'> {errors?.workExp?.work?.[i]?.endDate}</div><br />

            <label> Job Title : </label>
            <input type='text' name={`workExp.work[${i}].jobTitle`} value={values.workExp?.work[i]?.jobTitle} onChange={handleChange} />
            <div className='validate'> {errors?.workExp?.work?.[i]?.jobTitle}</div><br />
          </>
        ))
      }
      {values.workExp?.designation === 'experienced' &&
        <button type='button' onClick={() => handleNewWork(values, { setFieldValue })} disabled={errors?.workExp?.work}> ADD MORE </button>
      }

    </>
  )
}

export default WorkExperience