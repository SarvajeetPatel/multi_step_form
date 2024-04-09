import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import SelfDescription from './SelfDescription';
import { Formik } from 'formik';
import { validationSchema } from '../components/validationSchema';

const steps = ['Personal Details', 'Work Experience', 'Skills', 'SelfDescription'];

function HomePage() {
    const [activeStep, setActiveStep] = useState(0);
    var details = JSON.parse(localStorage.getItem('current application')) || {}

    useEffect(() => {
        const currStep = JSON.parse(localStorage.getItem('step')) || 0
        setActiveStep(currStep);
    }, [])

    const handleNext = (values) => {
        if (activeStep === 3) {
            const users = JSON.parse(localStorage.getItem('user application')) || []
            users.push(values)
            localStorage.setItem('user application', JSON.stringify(users))
        }
        localStorage.setItem('current application', JSON.stringify(values))
        localStorage.setItem('step', JSON.stringify(activeStep + 1))
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        localStorage.setItem('step', JSON.stringify(activeStep - 1))
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    };

    const handleReset = (values) => {
        setActiveStep(0)
        values.personalDetails = {}
        values.workExp = {}
        values.skills = {}
        values.desp = {}
        localStorage.removeItem('current application')
        localStorage.removeItem('step')
    };

    const handleTabs = (i) => {
        console.log(details?.personalDetails?.name.length, details?.workExp?.designation.length, details?.skills?.industry.length)
        if (i === 1 && details?.personalDetails?.name.length !== undefined) {
            setActiveStep(1)
            localStorage.setItem('step', JSON.stringify(i))
        } else if (i === 2 && details?.workExp?.designation.length !== undefined) {
            setActiveStep(2)
            localStorage.setItem('step', JSON.stringify(i))
        } else if (i === 3 && details?.skills?.industry.length !== undefined) {
            setActiveStep(3)
            localStorage.setItem('step', JSON.stringify(i))
        } else if (i === 0) {
            setActiveStep(0)
            localStorage.setItem('step', JSON.stringify(i))
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, i) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step className='stepper' key={label} {...stepProps}>
                            <StepLabel {...labelProps} onClick={() => handleTabs(i)}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Formik
                        initialValues={{
                            personalDetails: {
                                name: details?.personalDetails?.name || '', email: details?.personalDetails?.email || '', contact: details?.personalDetails?.contact || '', address: details?.personalDetails?.address || '', gender: details?.personalDetails?.gender || '', birthDate: details?.personalDetails?.birthDate || ''
                            },
                            workExp: {
                                designation: details?.workExp?.designation || '', work: details?.workExp?.work || []
                            },
                            skills: {
                                industry: details?.skills?.industry || '', skills: details?.skills?.skills || []
                            },
                            desp: {
                                value: details?.desp?.value || ''
                            }
                        }}
                        onSubmit={async (values) => {
                            try {
                                await validationSchema[activeStep].isValid(values, { abortEarly: false });
                                console.log("Validation successful");
                                handleNext(values);
                            } catch (errors) {
                                console.error("Validation failed:", errors);
                                return errors.inner.reduce((allErrors, currentError) => {
                                    if (!allErrors[currentError.path]) {
                                        allErrors[currentError.path] = currentError.message;
                                    }
                                    return allErrors;
                                }, {});
                            }
                        }}
                        validationSchema={validationSchema[activeStep]}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validateOnMount={false}
                    >
                        {
                            ({ handleSubmit, values }) => (
                                <form onSubmit={handleSubmit}>
                                    {activeStep === 0 && <PersonalDetails />}
                                    {activeStep === 1 && <WorkExperience />}
                                    {activeStep === 2 && <Skills />}
                                    {activeStep === 3 && <SelfDescription />}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={() => handleReset(values)}>Reset</Button>
                                        <Button type='submit'>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </form>
                            )
                        }
                    </Formik>
                </React.Fragment>
            )
            }
        </Box >
    );
}

export default HomePage;