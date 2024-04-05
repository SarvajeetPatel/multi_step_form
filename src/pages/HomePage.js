import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import SelfDescription from './SelfDescription';
import { Formik } from 'formik';
import { validationSchema } from '../components/validationSchema';

const steps = ['Personal Details', 'Work Experience', 'Skills', 'SelfDescription'];

function HomePage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const details = JSON.parse(localStorage.getItem('Personal Details')) || ''
    const workDetail = JSON.parse(localStorage.getItem('Work Experience')) || ''
    const skillDetails = JSON.parse(localStorage.getItem('Skills')) || ''

    React.useEffect(() => {
        const currStep = JSON.parse(localStorage.getItem('step')) || 0
        setActiveStep(currStep);
    }, [])

    const handleNext = async (values) => {

        switch (activeStep) {
            case 0:
                localStorage.setItem('Personal Details', JSON.stringify(values.personalDetails))
                break;
            case 1:
                if (values.workExp.designation === 'fresher') {
                    values.workExp.work = [];
                }
                localStorage.setItem('Work Experience', JSON.stringify(values.workExp))
                break;
            case 2:
                localStorage.setItem('Skills', JSON.stringify(values.skills))
                break;
            case 3:
                localStorage.setItem('Self Description', JSON.stringify(values.desp))
                const users = JSON.parse(localStorage.getItem('user application')) || []
                users.push(values)
                localStorage.setItem('user application', JSON.stringify(users))
                break;
            default:
                break;
        }
        localStorage.setItem('step', JSON.stringify(activeStep + 1))
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        localStorage.setItem('step', JSON.stringify(activeStep - 1))
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        localStorage.removeItem('Personal Details')
        localStorage.removeItem('Work Experience')
        localStorage.removeItem('Skills')
        localStorage.removeItem('step')
        localStorage.removeItem('Self Description')
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Formik
                        initialValues={{
                            personalDetails: {
                                name: details.name || '', email: details.email || '', contact: details.contact || '', address: details.address || '', gender: details.gender || '', birthDate: details.birthDate || ''
                            },
                            workExp: {
                                designation: workDetail.designation || '', work: workDetail.work || []
                            },
                            skills: {
                                industry: skillDetails.industry || '', skills: skillDetails.skills || []
                            },
                            desp: {
                                value: ''
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
                        validateOnChange={true}
                    >
                        {
                            ({ handleSubmit }) => (
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