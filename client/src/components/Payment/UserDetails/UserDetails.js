import React,{useState} from 'react';
import {useForm,FormProvider} from 'react-hook-form';
import {Typography,Grid,Button,TextField} from '@material-ui/core';
import './UserDetails.css';

const UserDetails = ({next,onPrev}) => {
    const {register,handleSubmit} = useForm();
    return (
        <div>
            <div className="heading">
                <Typography variant="h6" gutterBottom>User Details</Typography>
            </div>
            <div className="form">
                <FormProvider >
                    <form onSubmit={handleSubmit((data) => next(data))}>
                        <Grid className="grid" container spacing={3}>
                            <Grid container item xs={12} sm={6} spacing={3}>
                                <TextField required {...register("firstName")} name="firstName" label="first name"/>
                            </Grid>
                            <Grid container item xs={12} sm={6} spacing={3}>
                                <TextField required {...register("lastName")} name="lastName" label="last name"/>
                            </Grid>
                            <Grid container item xs={12} sm={6} spacing={3}>
                                <TextField required {...register("mobileNumber")} name="mobileNumber" label="mobile number"/>
                            </Grid>
                            <Grid container item xs={12} sm={6} spacing={3}>
                                <TextField required {...register("emailId")} name="emailId" label="email id"/>
                            </Grid>
                            
                            
                        </Grid>
                        <div className="buttonsection">
                            <Button onClick={()=>onPrev()} variant="outlined" color="secondary">Back</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default UserDetails
