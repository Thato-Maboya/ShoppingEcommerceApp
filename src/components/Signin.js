import React from 'react'
import { Link, Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from "../Firebase";


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

const Signin = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()

    const onSubmit = async (data) => {
        const { email, password } = data
        try {
            const res = await auth.signInWithEmailAndPassword(email, password).then(() => {
                alert("Welcome Back");
                history.push("/")
            }) 
            
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <section className="menu">
            <div className="title">
                <h2>SignIn Page</h2>
                <div className="underline"></div>
            </div>

            <Container maxWidth="sm" className="section-center">
                <div className="page-center">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField type="email" id="standard-basic" label="Email" name="email" required fullWidth autoFocus {...register("email", { required: true })} />
                        {errors.email?.type === 'required' && "email is required"}
                        <TextField type="password" id="standard-basic" label="Password" name="password" required fullWidth autoFocus {...register("password", { required: true })} />
                        {errors.password?.type === 'required' && "password is required"}
                        <br />
                        <div className="padding-break btn-container">
                            <button type="submit" className=" filter-btn">Sign In</button> 
                        </div>
                        Don't have an account?<Link className="nav-link" to="/Signup">SignUp</Link>
                    </form>
                </div>
            </Container>
        </section>
    );
}

export default Signin;
