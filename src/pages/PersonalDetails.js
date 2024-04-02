import { Formik } from 'formik'
import React, { useContext } from 'react'
import DatePicker from 'react-datepicker'
import NoteContext from '../context/NoteContext'
import * as yup from 'yup'

function PersonalDetails({ handleNext }) {
    const { personalDetails, setPersonalDetails } = useContext(NoteContext);

    const yupValidate = yup.object().shape({
        name: yup.string().required('Please Enter your name'),
        email: yup.string().email().required('Please Enter your email'),
        contact: yup.string().required('Please Enter your contact'),
        address: yup.string().required('Please Enter your address'),
        gender: yup.string().required('Please select your gender'),
        birthDate: yup.string().required('Please Enter your birthDate')
    })
    return (
        <>
            <Formik
                initialValues={{
                    name: personalDetails.name || '',
                    email: personalDetails.email || '',
                    contact: personalDetails.contact || '',
                    address: personalDetails.address || '',
                    gender: personalDetails.gender || '',
                    birthDate: personalDetails.birthDate || ''
                }}
                onSubmit={(values) => {
                    console.log(values)
                    setPersonalDetails(values)
                    handleNext(values)
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={yupValidate}
            >
                {
                    ({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <h2> Personal Details </h2>
                            <label> Enter your Full Name : </label>
                            <input type='text' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            <div className='validate'>{errors.name}</div><br /> <br />

                            <label> Enter your Email ID : </label>
                            <input type='text' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            <div className='validate'>{errors.email}</div><br /> <br />

                            <label> Enter your Contact No. : </label>
                            <input type='text' name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} />
                            <div className='validate'>{errors.contact}</div><br /> <br />

                            <label> Enter your address : </label>
                            <input type='text' name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} />
                            <div className='validate'>{errors.address}</div><br /> <br />

                            <label> Select your Gender : </label>
                            <input type='radio' name='gender' value='Female' onChange={handleChange} onBlur={handleBlur} defaultChecked={values.gender === 'Female'} />
                            <label>Female</label>
                            <input type='radio' name='gender' value='Male' onChange={handleChange} onBlur={handleBlur} defaultChecked={values.gender === 'Male'} />
                            <label>Male</label>
                            <input type='radio' name='gender' value='Others' onChange={handleChange} onBlur={handleBlur} defaultChecked={values.gender === 'Others'} />
                            <label>Others</label>
                            <div className='validate'>{errors.gender}</div>
                            <br /> <br />

                            <label> Select your BirthDate : </label>
                            <DatePicker name='birthDate' selected={values.birthDate} onChange={(date) => setFieldValue('birthDate', date)} /><br />
                            <div className='validate'>{errors.birthDate}</div>

                            <button type='button' onClick={handleSubmit}> SAVE </button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}

export default PersonalDetails