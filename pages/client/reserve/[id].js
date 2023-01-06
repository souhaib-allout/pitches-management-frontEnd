import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';

import Head from "next/head";
import HeaderClient from "../../../components/parts/clients/header";
import FooterClient from "../../../components/parts/clients/footer";
import {useState} from "react";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {Button, Modal, Space} from 'antd';
import moment from 'moment';
import Link from "next/link";
import JsFiles from "../../../components/parts/packages/jsFiles";
import StadiumRecherche from "../../../components/parts/clients/search";
import {Formik} from 'formik';
import UseUserInfo from "../../../hooks/useUserInfo";
import {useRouter} from "next/router";

const {confirm} = Modal;

export default function SpecificPitch(props) {
    const [reservations, setReservations] = useState(props.reservations)
    // const [calEvents,setCalEvents]=useState(null)
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [reservationId, setReservationId] = useState(null);
    const route = useRouter()

    const events = reservations.map(reservation =>
        (
            {
                "id": reservation.id,
                "title": "Résérved",
                "date": reservation.dateReservation,
                "display": 'background',
                "backgroundColor": "#ce079c",
                "color": "black"

            }
        )
    )
    console.log(events)


    const showConfirm = (dateReservation) => {
        confirm({
            title: 'Confirmation',
            icon: <ExclamationCircleFilled/>,
            content: 'Do you Want reserve this pitch at ' + dateReservation,
            onOk() {

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showError = () => {
        Modal.error({
            title: 'This is an error message',
            content: "You can't reserve this pitch , its already taken",
        });
    };
    const showSuccess = () => {
        Modal.success({
            content: 'Your reservation has been registred',
        });
    };

    function handleDateClick(e) {
        const resDate = moment(e.date).format('yyyy-MM-DD HH:mm:ss')

        fetch('http://localhost:8080/api/reservations/byDate/' + resDate).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data) {
                    showError()
                } else {
                    setSelectedDate(resDate)
                    setOpen(true)
                }
                // data =true?  showConfirm(resDate) : showError
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    function eventClick(info) {

        console.log(info.event.id)
    }

    function addPayment(values) {
        fetch('http://localhost:8080/api/payments/' + reservationId, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })  .then((response) => response.text())
            .then((data) => {
                // route.push("/client/profile/reservations/" + reservationId)
                console.log('Success:', data);
                // route.push('/client/profile/reservations/'+reservationId)

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <>
            <Head>
                <title>Reservation</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HeaderClient/>
            <main>
                <div className="container-fluid page-header mb-5 p-0"
                     style={{backgroundImage: 'url(img/carousel-1.jpg)'}}>
                    <div className="container-fluid page-header-inner py-5">
                        <div className="container text-center pb-5">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">Reservation</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Rooms</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <StadiumRecherche villes={props.villes}/>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center text-primary text-uppercase">Stadium</h6>
                            <h1 className="mb-5">Stadium <span
                                className="text-primary text-uppercase">Informations</span>
                            </h1>
                        </div>

                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6">
                                <h1 className="mb-4">{props.pitch.name}</h1>
                                <p className="mb-4">{props.pitch.description}</p>
                                <div className="row g-3 pb-4">
                                    <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="border rounded p-1">
                                            <div className="border rounded text-center p-4">
                                                <i className="fa fa-users fa-2x text-primary mb-2"/>
                                                <h2 className="mb-1"
                                                    data-toggle="counter-up">{props.pitch.capacity}</h2>
                                                <p className="mb-0">Players </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="border rounded p-1">
                                            <div className="border rounded text-center p-4">
                                                <i className="fa fa-hotel fa-2x text-primary mb-2"/>
                                                <h2 className="mb-1" data-toggle="counter-up">1234</h2>
                                                <p className="mb-0">Rooms</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="border rounded p-1">
                                            <div className="border rounded text-center p-4">
                                                <i className="fa fa-users-cog fa-2x text-primary mb-2"/>
                                                <h2 className="mb-1"
                                                    data-toggle="counter-up">{props.pitch.covered ? "Indoor" : "Outdoor"}</h2>
                                                <p className="mb-0">Type </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        {props.pitch?.images.map((image, index) =>

                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={index} className={index == 0 ? "active" : ""}
                                                    aria-current="true"
                                                    aria-label="Slide 1"/>
                                        )}

                                    </div>
                                    <div className="carousel-inner">
                                        {props.pitch?.images.map((image, index) =>

                                            <div className={index == 0 ? "carousel-item active" : "carousel-item "}>
                                                <img src={"http://localhost:8080/api/storage?filePath=" + image.name}
                                                     className="d-block w-100" alt="..."/>
                                            </div>
                                        )}

                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div className="container " style={{marginTop: 100}}>
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center text-primary text-uppercase">Reservation</h6>
                            <h1 className="mb-5">Reservation <span
                                className="text-primary text-uppercase">Informations</span>
                            </h1>
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                            events={events}
                            initialView='timeGridWeek'
                            height="80vh"
                            // visibleRange= {
                            //     start: '2020-03-22',
                            //     end: '2020-03-25'
                            // }
                            dateClick={handleDateClick}
                            eventClick={eventClick}
                            slotMinTime="06:00:00"
                            slotMaxTime="24:00:00"
                            slotDuration="01:00:00"

                        />

                    </div>
                </div>

            </main>
            {/*<FooterClient/>*/}

            <Modal
                title="Payment"
                okText="Reserve Now"
                okClass="btn-primary"
                centered
                open={open}
                footer={null}
                // onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={700}>
                <Formik
                    initialValues={{type_payment: 'Online', amount: props.pitch.price / props.pitch.capacity}}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {

                        let obj = {
                            owner: UseUserInfo('client').userId,
                            pitch: props.pitch.id,
                            dateReservation: selectedDate
                        }

                        fetch('http://localhost:8080/api/reservations', {
                            method: 'POST', // or 'PUT'
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(obj),
                        }).then((response) => response.text())
                            .then((data) => {
                                setReservationId(data)
                                console.log("success here")
                                console.log(reservationId)
                                console.log(reservationId)
                                addPayment(values)
                                console.log('Success:', data);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
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
                          /* and other goodies */
                      }) => (
                        <form className="container" onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select" name="card_type" onChange={handleChange}>
                                            <option value="Visa">Visa</option>
                                            <option value="Master Card">Master Card</option>
                                        </select>
                                        <label htmlFor="select1">Card type</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name="card_number"
                                               placeholder="Your Name" onChange={handleChange}/>
                                        <label htmlFor="name">Card Number</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name="expiration_date"
                                               placeholder="Your Email" onChange={handleChange}/>
                                        <label htmlFor="email">Expiration Date</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" data-target-input="nearest">
                                        <input type="number" className="form-control datetimepicker-input" name="amount"
                                               placeholder="Check In" data-target="#date3" value={values.amount}
                                               data-toggle="datetimepicker" readOnly="readOnly"/>
                                        <label htmlFor="checkin">Amount</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Pay Now</button>
                                </div>
                            </div>

                        </form>
                    )}

                </Formik>

            </Modal>

            <JsFiles/>

        </>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const {id} = context.query
    const res = await fetch(`http://localhost:8080/api/pitches/` + id)
    const pitch = await res.json()


    const res2 = await fetch(`http://localhost:8080/api/reservations/byPitch/` + id)
    const reservations = await res2.json()

    const res3 = await fetch(`http://localhost:8080/api/villes`)
    const villes = await res3.json()


    // Pass data to the page via props
    return {props: {pitch, reservations, villes}}
}
