import { Formik } from 'formik'
import React from 'react'
import DatePicker from 'react-datepicker'

function PersonalDetails() {
    return (
        <>
            <Formik
                initialValues={{
                    name: '', email: '', contact: '', address: '', gender: '', birthDate: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values)
                        localStorage.setItem('Personal Details', JSON.stringify(values))
                        setSubmitting(false)
                    }, 500);
                }}
            >
                {
                    ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <h2> Personal Details </h2>
                            <label> Enter your Full Name : </label>
                            <input type='text' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} /> <br />

                            <label> Enter your Email ID : </label>
                            <input type='text' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} /> <br />

                            <label> Enter your Contact No. : </label>
                            <input type='text' name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} /> <br />

                            <label> Enter your address : </label>
                            <input type='text' name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} /> <br />

                            <label> Select your Gender : </label>
                            <input type='radio' name='gender' value='Female' onChange={handleChange} onBlur={handleBlur} />
                            <label>Female</label>
                            <input type='radio' name='gender' value='Male' onChange={handleChange} onBlur={handleBlur} />
                            <label>Male</label>
                            <input type='radio' name='gender' value='Others' onChange={handleChange} onBlur={handleBlur} />
                            <label>Others</label> <br />

                            <label> Select your BirthDate : </label>
                            <DatePicker name='birthDate' selected={values.birthDate} onChange={(date) => setFieldValue('birthDate', date)} />

                            <button type='submit' disabled={isSubmitting}> {isSubmitting ? 'Submitting' : 'Proceed to Next'} </button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}

export default PersonalDetails