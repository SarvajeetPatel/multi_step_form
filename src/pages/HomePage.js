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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

const steps = ['Personal Details', 'Work Experience', 'Skills', 'SelfDescription'];

function HomePage() {
    const [activeStep, setActiveStep] = React.useState(0);

    const details = JSON.parse(localStorage.getItem('Personal Details')) || ''
    const workDetail = JSON.parse(localStorage.getItem('Work Experience')) || ''
    const skillDetails = JSON.parse(localStorage.getItem('Skills')) || ''

    const { trigger, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    // const [skipped, setSkipped] = React.useState(new Set());

    // const isStepOptional = (step) => {
    //     return step === 3;
    // };

    // const isStepSkipped = (step) => {
    //     return skipped.has(step);
    // };

    const handleNext = async (values, errors) => {
        switch (activeStep) {
            case 0:
                await trigger();
                if (errors.personalDetails === undefined) {
                    localStorage.setItem('Personal Details', JSON.stringify(values.personalDetails))
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            case 1:
                await trigger();
                if (errors.workExp === undefined) {
                    localStorage.setItem('Work Experience', JSON.stringify(values.workExp))
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            case 2:
                await trigger();
                if (errors.skills === undefined) {
                    localStorage.setItem('Skills', JSON.stringify(values.skills))
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            case 3:
                await trigger();
                if (errors.desp === undefined) {
                    localStorage.setItem('Self Description', JSON.stringify(values.desp))
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            default:
                break;
        }
        console.log(values, "values", errors)
        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        // setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
        localStorage.removeItem('Personal Details')
        localStorage.removeItem('Work Experience')
        localStorage.removeItem('Skills')
        localStorage.removeItem('Self Description')
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption">Optional</Typography>
                    //     );
                    // }
                    // if (isStepSkipped(index)) {
                    //     stepProps.completed = false;
                    // }
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
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={validationSchema[activeStep]}
                        validateOnChange={false}
                    >
                        {
                            ({ values, handleSubmit, errors }) => (
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
                                        {/* {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                                </Button>
                            )} */}

                                        <Button type='button' onClick={() => handleNext(values, errors)}>
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