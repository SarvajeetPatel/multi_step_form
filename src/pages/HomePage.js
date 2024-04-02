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
import NoteContext from '../context/NoteContext';
import { Formik } from 'formik';

const steps = ['Personal Details', 'Work Experience', 'Skills', 'SelfDescription'];

export default function HomePage() {
    const [activeStep, setActiveStep] = React.useState(0);
    // const [skipped, setSkipped] = React.useState(new Set());
    const { setPersonalDetails, setWorkExp, setSkills, setDesp, personalDetails } = React.useContext(NoteContext);
    
    // const isStepOptional = (step) => {
    //     return step === 3;
    // };

    // const isStepSkipped = (step) => {
    //     return skipped.has(step);
    // };

    const handleNextPage = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleNext = (values) => {
        // console.log(values)
        switch (activeStep) {
            case 0:
                setPersonalDetails(values);
                localStorage.setItem('Personal Details', JSON.stringify(values))
                break;
            case 1:
                setWorkExp(values);
                localStorage.setItem('Work Experience', JSON.stringify(values))
                break;
            case 2:
                setSkills(values);
                localStorage.setItem('Skills', JSON.stringify(values))
                break;
            case 3:
                setDesp(values);
                localStorage.setItem('Self Description', JSON.stringify(values))
                break;
            default:
                break;
        }
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
        setPersonalDetails({})
        setWorkExp({})
        setSkills({})
        setDesp({})
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
                    <Formik>
                        {activeStep === 0 && <PersonalDetails handleNext={handleNext} />}
                        {activeStep === 1 && <WorkExperience handleNext={handleNext} />}
                        {activeStep === 2 && <Skills handleNext={handleNext} />}
                        {activeStep === 3 && <SelfDescription handleNext={handleNext} />}
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

                            <Button type='submit' onClick={handleNextPage}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Formik>
                </React.Fragment>
            )
            }
        </Box >
    );
}