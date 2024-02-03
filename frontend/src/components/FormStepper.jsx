import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function FormStepper({ steps, stepComponent, onClose, onSubmit, errors }) {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 2) {
                onSubmit()
                return 2
            }
            return prevActiveStep + 1
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep <= 0) return 0
            return prevActiveStep - 1
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label} >
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box p={2} height='200px'>
                {stepComponent[activeStep]}
            </Box>
            {errors && <Typography color='error' >Fill all the required field.</Typography>}
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
                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
}

export default FormStepper;