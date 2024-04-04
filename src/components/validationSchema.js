import * as yup from 'yup';

export const validationSchema = [
    yup.object().shape({
        personalDetails: yup.object().shape({
            name: yup.string().required('Please Enter your name'),
            email: yup.string().email('Enter Valid email ID').required('Please Enter your email'),
            contact: yup.string().required('Please Enter your contact'),
            address: yup.string().required('Please Enter your address'),
            gender: yup.string().required('Please select your gender'),
            // birthDate: yup.date().required('Please Enter your birthDate')
        })
    }),
    yup.object().shape({
        workExp: yup.object().shape({
            designation: yup.string().required('Please select designation'),
            work: yup.array().of(
                yup.object().shape({
                    name: yup.string().when('designation', {
                        is: 'experienced',
                        then: yup.string().required('Enter Organisation NAme'),
                        otherwise: yup.string()
                    }),
                    startDate: yup.string().when('designation', {
                        is: 'experienced',
                        then: yup.string().required('Enter startDate'),
                        otherwise: yup.string()
                    }),
                    endDate: yup.string().when('designation', {
                        is: 'experienced',
                        then: yup.string().required('Enter endDate'),
                        otherwise: yup.string()
                    }),
                    jobTitle: yup.string().when('designation', {
                        is: 'experienced',
                        then: yup.string().required('Enter jobTitle'),
                        otherwise: yup.string()
                    })
                })
            )
        })
    }),
    yup.object().shape({
        skills: yup.object().shape({
            industry: yup.string().required('Please choose your indsutry!'),
            skills: yup.array().of(
                yup.string().required('Please choose skills!')
            )
        })
    }),
    yup.object().shape({
        desp: yup.object().shape({
            value: yup.string().required('Pleawse insert some description!')
        })
    })
]