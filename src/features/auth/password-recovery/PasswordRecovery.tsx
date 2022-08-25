import React, {useCallback} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {passwordRecoveryLink, setStatusSendingPassword} from './password-recovery-reducer';
import {CheckEmail} from './CheckEmail';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../common/hooks/useAppSelector";


export const PasswordRecovery = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const statusSendingPassword = useAppSelector(state => state.passwordRecovery.statusSendingPassword)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(passwordRecoveryLink(values.email))
            formik.resetForm()
        },
    });

    const disabled = (formik.touched.email && !!formik.errors.email)

    const onClickBackToLogin = useCallback(() => {
        dispatch(setStatusSendingPassword('idle'))
        navigate('/login')
    }, [])

    if (statusSendingPassword === 'loading') {
        return <CheckEmail onClickBackToLogin={onClickBackToLogin}/>
    }

    return (
        <Card sx={{maxWidth: 412, margin: '0 auto'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Forgot your password?
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField id="email"
                               label="Email"
                               variant="standard"
                               {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Enter your email address and we will send you further instructions
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained"
                                type="submit"
                                disabled={disabled}
                        >
                            Send Instructions
                        </Button>
                    </Stack>
                </form>
            </CardContent>
            <CardActions>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Did you remember your password?
                </Typography>
                <Button size="small"
                        onClick={onClickBackToLogin}
                >
                    Try logging in
                </Button>
            </CardActions>
        </Card>
    );
}

