import Head from "next/head";
import HeaderClient from "../../../components/parts/clients/header";
import StadiumRecherche from "../../../components/parts/clients/search";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import JsFiles from "../../../components/parts/packages/jsFiles";
import Link from "next/link";
import {Image} from "antd";

export default function SpecificPitch(props) {

    function diveded(number) {
        if (number % 4 === 0) {
            return "w-75"
        } else if (number % 3 === 0) {
            return "w-50"
        } else if (number % 2 === 0) {
            return "w-100"
        } else {
            return "w-75"
        }

    }

    return (
        <>
            <Head>
                <title>{props.pitch.name}</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HeaderClient/>
            <main>
                <div className="container-fluid page-header mb-5 p-0"
                     style={{backgroundImage: 'url(/img/carousel-1.jpg)'}}>
                    <div className="container-fluid page-header-inner py-5">
                        <div className="container text-center pb-5">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">{props.pitch.name}</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Stadium</a></li>
                                    <li className="breadcrumb-item text-white active"
                                        aria-current="page">{props.pitch.name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <StadiumRecherche villes={props.villes}/>

                <div className="container-xxl py-5">
                    <div className="container">
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
                                <Link className="btn btn-primary py-3 px-5 mt-2" href={'/client/reserve/' + props.pitch.id}>Reserve
                                    Now</Link>
                            </div>
                            <div className="col-lg-6">
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        {props.pitch?.images.map((image, index) =>

                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={index} className={index==0? "active" : ""} aria-current="true"
                                                aria-label="Slide 1"/>
                                        )}

                                    </div>
                                    <div className="carousel-inner">
                                        {props.pitch?.images.map((image, index) =>

                                            <div className={index == 0?"carousel-item active" : "carousel-item "}>
                                                <img src={"http://localhost:8080/api/storage?filePath=" + image.name} className="d-block w-100" alt="..."/>
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
                </div>
            </main>
            {/*<FooterClient/>*/}

            <JsFiles/>

        </>

    )

}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const {id} = context.query
    const res = await fetch(`http://localhost:8080/api/pitches/` + id)
    const pitch = await res.json()

    const res3 = await fetch(`http://localhost:8080/api/villes`)
    const villes = await res3.json()

    // Pass data to the page via props
    return {props: {pitch, villes}}
}
