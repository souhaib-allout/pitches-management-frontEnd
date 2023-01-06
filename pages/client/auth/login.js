import Head from "next/head";
import HeaderClient from "../../../components/parts/clients/header";
import StadiumRecherche from "../../../components/parts/clients/search";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import JsFiles from "../../../components/parts/packages/jsFiles";
import {useState} from "react";
import {Formik} from 'formik';
import UseLogin from "../../../hooks/useLogin";
import Cookies from "js-cookie";
import UseLogout from "../../../hooks/useLogout";
import UseUserInfo from "../../../hooks/useUserInfo";
import {useRouter} from "next/router";


export default function ClientLogin(props) {
    const [section, setSetction] = useState("login")
    const route=useRouter()


    // UseLogout('client')
    console.log('///////////page')
    // console.log(UseUserInfo('client'))
    const [login,setLogin] = UseLogin(null)

    // const user=Cookies.get('client')
    // console.log('///////////page')
    // console.log(user)

    //
    // // Cookies.remove('client')
    // console.log("from pages "+Cookies.get('test'))
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HeaderClient/>
            <main>
                <div className="container-fluid page-header mb-5 p-0"
                     style={{backgroundImage: 'url(/img/carousel-1.jpg)'}}>
                    <div className="container-fluid page-header-inner py-5">
                        <div className="container text-center pb-5">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">Login</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Login</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>


                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center text-primary text-uppercase">Auhtentication</h6>
                            <h1 className="mb-5">Section <span
                                className="text-primary text-uppercase">{section === 'login' ? 'Sign in ' : 'Sign Up'}</span>
                            </h1>
                        </div>
                        <div className="row g-5">
                            <div className="col-lg-6">
                                <div className="row g-3">
                                    <div className="col-6 text-end">
                                        <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s"
                                             src="/img/about-1.jpg" style={{marginTop: '25%'}}/>
                                    </div>
                                    <div className="col-6 text-start">
                                        <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s"
                                             src="/img/about-2.jpg"/>
                                    </div>
                                    <div className="col-6 text-end">
                                        <img className="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s"
                                             src="/img/about-3.jpg"/>
                                    </div>
                                    <div className="col-6 text-start">
                                        <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s"
                                             src="/img/about-4.jpg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {section == 'logup' ?

                                    <Formik
                                        validate={values => {
                                            const errors = {};
                                            if (!values.email) {
                                                errors.email = 'Required';
                                            } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                            ) {
                                                errors.email = 'Invalid email address';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, {setSubmitting}) => {
                                            setTimeout(() => {
                                                alert(JSON.stringify(values, null, 2));
                                                setSubmitting(false);
                                            }, 400);
                                        }}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                              isSubmitting,
                                              section,

                                              /* and other goodies */
                                          }) => (
                                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                                <form>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="text" className="form-control"
                                                                       id="first_name"
                                                                       placeholder="Your Name"/>
                                                                <label htmlFor="name">First Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="text" className="form-control"
                                                                       id="last_name"
                                                                       placeholder="Your Name"/>
                                                                <label htmlFor="name">Last Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="email" className="form-control"
                                                                       id="email"
                                                                       placeholder="Your email"/>
                                                                <label htmlFor="name">Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="email" className="form-control"
                                                                       id="phone"
                                                                       placeholder="Your phone"/>
                                                                <label htmlFor="name">Phone</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="email" className="form-control"
                                                                       id="location"
                                                                       placeholder="Your address"/>
                                                                <label htmlFor="location">Address</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input type="password" className="form-control"
                                                                       id="password"
                                                                       placeholder="Your password"/>
                                                                <label htmlFor="name">Password</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100 py-3"
                                                                    type="submit">Sign Up
                                                            </button>
                                                        </div>
                                                        <div className="col-12">
                                                            <p onClick={() => setSetction("login")}>Already have
                                                                account
                                                                ? SignIn</p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </Formik>
                                    :
                                    <Formik
                                        initialValues={{email: '', password: '', role:'client'}}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.email) {
                                                errors.email = 'Required';
                                            } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                            ) {
                                                errors.email = 'Invalid email address';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(values, {setSubmitting}) => {
                                            // loginSubmit(values)
                                            console.log('here'+login)
                                            setLogin(JSON.stringify(values))
                                            // route.push('/')

                                        }}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                              isSubmitting,
                                              section,

                                              /* and other goodies */
                                          }) => (

                                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row g-3">
                                                        <div className="col-md-12">
                                                            <div className="form-floating">
                                                                <input type="email" className="form-control"
                                                                       name="email"
                                                                       placeholder="Your Email"
                                                                       onChange={handleChange}/>
                                                                <label htmlFor="name">Your Email</label>
                                                            </div>
                                                            {errors.email && touched.email && errors.email}

                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-floating">
                                                                <input type="password" className="form-control"
                                                                       name="password"
                                                                       placeholder="Your password"
                                                                       onChange={handleChange}/>
                                                                <label htmlFor="password">Your Password</label>
                                                            </div>
                                                            {errors.password && touched.password && errors.password}

                                                        </div>
                                                        <div className="col-12">
                                                            <button type="submit"
                                                                    className="btn btn-primary w-100 py-3">
                                                                Sign In
                                                            </button>
                                                        </div>
                                                        <div className="col-12">
                                                            <p onClick={() => setSetction("logup")}
                                                               className="text-black">You don't have accout?
                                                                ? SignUp</p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </Formik>}

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/*<FooterClient/>*/}

            <JsFiles/>

        </>
    )
}