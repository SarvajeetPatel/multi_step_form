import React from 'react'
import DatePicker from 'react-datepicker'
import { useFormikContext } from 'formik'
import { format } from 'date-fns'

function PersonalDetails() {
    const { values, handleBlur, handleChange, setFieldValue, errors } = useFormikContext();
    const min = Number(new Date().getFullYear() - 18)
    const firstDate = format(new Date(), `${min}/12/31 00:00:00`)
    console.log(values?.personalDetails?.gender)
    return (
        <>
            <h2> Personal Details </h2>
            <label> Enter your Full Name : </label>
            <input type='text' name='personalDetails.name' value={values?.personalDetails?.name} onChange={handleChange} onBlur={handleBlur} />
            <div className='validate'>{errors?.personalDetails?.name}</div> <br /> <br />

            <label> Enter your Email ID : </label>
            <input type='text' name='personalDetails.email' value={values?.personalDetails?.email} onChange={handleChange} onBlur={handleBlur} />
            <div className='validate'>{errors?.personalDetails?.email}</div><br /> <br />

            <label> Enter your Contact No. : </label>
            <input type='text' name='personalDetails.contact' value={values?.personalDetails?.contact} onChange={handleChange} onBlur={handleBlur} />
            <div className='validate'>{errors?.personalDetails?.contact}</div><br /> <br />

            <label> Enter your address : </label>
            <input type='text' name='personalDetails.address' value={values?.personalDetails?.address} onChange={handleChange} onBlur={handleBlur} />
            <div className='validate'>{errors?.personalDetails?.address}</div><br /> <br />

            <label> Select your Gender : </label>
            <input type='radio' name='personalDetails.gender' value='Female' onChange={handleChange} onBlur={handleBlur} checked={values?.personalDetails?.gender === 'Female'} />
            <label>Female</label>
            <input type='radio' name='personalDetails.gender' value='Male' onChange={handleChange} onBlur={handleBlur} checked={values?.personalDetails?.gender === 'Male'} />
            <label>Male</label>
            <input type='radio' name='personalDetails.gender' value='Others' onChange={handleChange} onBlur={handleBlur} checked={values?.personalDetails?.gender === 'Others'} />
            <label>Others</label>
            <div className='validate'>{errors?.personalDetails?.gender}</div> <br /> <br />

            <label> Select your BirthDate : </label>
            <DatePicker name='personalDetails.birthDate' showIcon maxDate={firstDate} showFourColumnMonthYearPicker sho showYearDropdown selected={values?.personalDetails?.birthDate} onChange={(date) => setFieldValue('personalDetails.birthDate', date)} /><br />
            <div className='validate'>{errors?.personalDetails?.birthDate}</div>
        </>
    )
}

export default PersonalDetails