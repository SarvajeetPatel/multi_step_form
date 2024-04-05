import * as yup from 'yup';

export const validationSchema = [
    yup.object().shape({
        personalDetails: yup.object().shape({
            name: yup.string().required('Please Enter your name'),
            email: yup.string().email('Enter Valid email ID').required('Please Enter your email'),
            contact: yup.string().required('Please Enter your contact'),
            address: yup.string().required('Please Enter your address'),
            gender: yup.string().required('Please select your gender'),
            birthDate: yup.string().required('Please Enter your birthDate')
        })
    }),
    yup.object().shape({
        workExp: yup.object().shape({
            designation: yup.string().required('Please select designation'),
            work: yup.array().of(
                yup.object().shape({
                    name: yup.string().test('name test', 'name is required!', function (value, ctx) {
                        if (ctx.from[1].value.designation === 'experienced') return value !== undefined
                        else return true
                    }),
                    startDate: yup.string().test('startDate test', 'startDate is required!', function (value, ctx) {
                        if (ctx.from[1].value.designation === 'experienced') return value !== undefined
                        else return true
                    }),
                    endDate: yup.string().test('endDate test', 'endDate is required!', function (value, ctx) {
                        if (ctx.from[1].value.designation === 'experienced') return value !== undefined
                        else return true
                    }),
                    jobTitle: yup.string().test('jobTitle test', 'jobTitle is required!', function (value, ctx) {
                        if (ctx.from[1].value.designation === 'experienced') return value !== undefined
                        else return true
                    })
                })
            )
        })
    }),
    yup.object().shape({
        skills: yup.object().shape({
            industry: yup.string().required('Please choose your indsutry!'),
            skills: yup.array().test('skill test', 'Please choose at least One skill!', function (value, ctx) {
                console.log(value, ctx)
                if (ctx.from[0].value.industry !== 'Finance') return value.length !== 0
                else return true
            })
        })
    }),
    yup.object().shape({
        desp: yup.object().shape({
            value: yup.string().required('Pleawse insert some description!')
        })
    })
]