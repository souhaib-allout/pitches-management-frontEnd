import Head from "next/head";
import HeaderClient from "../../../../components/parts/clients/header";
import JsFiles from "../../../../components/parts/packages/jsFiles";
import {Button, Input, Rate, Space, Table, Modal, Select} from "antd";
import {useRef, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import UseUserInfo from "../../../../hooks/useUserInfo";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {Formik} from 'formik';
import {useRouter} from "next/router";

export default function SpecificReservation(props) {

    console.log(props.players)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = UseUserInfo('client')
    const [open, setOpen] = useState(false);
    const [selectedPlayersIds, setSelectedPlayersIds] = useState(props.allUsers)
    const router = useRouter()

    const success = () => {
        Modal.success({
            content: 'Rated registred success',
        });
    };

    function ratePlayer(e, playerId) {
        console.log("rate player")
        console.log(e, playerId)
        fetch('http://localhost:8080/api/playerRates', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nb_stars: e,
                reservation: props.reservation.id,
                owner_id: user.userId,
                player_id: playerId
            }),
        })
            .then((data) => {
                console.log('Success:', data);
                success()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    function ratePitch(e) {
        console.log(e)
        fetch('http://localhost:8080/api/pitchRates', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pitch_id: props.reservation.pitch,
                nb_stars: e,
                reservation: props.reservation.id,
                player_id: user.userId
            }),
        })
            .then((data) => {
                console.log('Success:', data);
                success()
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Method',
            dataIndex: 'type_payment',
            key: 'type_payment',
            sorter: (a, b) => a.type_payment.length - b.type_payment.length,
            ...getColumnSearchProps('type_payment'),
        },
        {
            title: 'Card Type',
            dataIndex: 'card_type',
            key: 'card_type',
            sorter: (a, b) => a.card_type.length - b.card_type.length,
            ...getColumnSearchProps('card_type'),
        },
        {
            title: 'Card Number',
            dataIndex: 'card_number',
            key: 'card_number',
            sorter: (a, b) => a.card_number.length - b.card_number.length,
            ...getColumnSearchProps('card_number'),
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount.length - b.amount.length,
            ...getColumnSearchProps('amount'),


        },
        {
            title: 'Payment Date',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchProps('created_at'),
            sorter: (a, b) => a.created_at.length - b.created_at.length,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                moment(record.created_at).format('DD/MM/y HH:mm')
            ),

        },


    ];

    const handleInvitePlayerChange = (value) => {
        setSelectedPlayersIds(value)
    };

    function invitePlayers() {
        console.log("clicked")
        fetch('http://localhost:8080/api/reservations/addPlayerToReservation?reservation_id=' + props.reservation.id + "&&player_id=" + selectedPlayersIds, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // async function closeModalRefreshPlayer() {
    //     const res4 = await fetch(`http://localhost:8080/api/users/byReservation?players_ids=` + playersIds)
    //     const players = await res4.json()
    //     fetch('/api/profile-data')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data)
    //             setLoading(false)
    //         })
    //
    // }
    return (
        <>
            <Head>
                <title>Reservations info</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HeaderClient/>
            <main>
                <div className="container-fluid page-header mb-5 p-0"
                     style={{backgroundImage: 'url(/img/carousel-1.jpg)'}}>
                    <div className="container-fluid page-header-inner py-5">
                        <div className="container text-center pb-5">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">Reservation</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Profile</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Reservations
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center  text-uppercase">
                                <span className="text-primary me-3">Reservation </span>
                                {moment(props.reservation.dateReservation).format('DD/MM/y HH:mm')}
                            </h6>
                            <h1 className="mb-5"> Payments <span
                                className="text-primary text-uppercase"> Informations</span></h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <Table columns={columns}
                                       dataSource={props.reservation?.payments}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center text-primary text-uppercase">TeamS</h6>
                            <h1 className="mb-5">Rate your Team <span
                                className="text-primary text-uppercase">Players</span>
                            </h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary" onClick={() => setOpen(true)}>Invite</button>
                            </div>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {props.players.map(player =>
                                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="rounded shadow overflow-hidden">
                                        <div className="position-relative">
                                            <img className="img-fluid" src="/img/team-1.jpg" alt=""/>
                                        </div>
                                        <div className="text-center p-4 mt-1">
                                            <h5 className="fw-bold mb-0">{player.first_name + ' ' + player.last_name}</h5>
                                            <Rate defaultValue={3} onChange={(e) => ratePlayer(e, player.id)}
                                                  style={{color: "#FEA116"}}/>;
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title text-center text-primary text-uppercase">Stadium</h6>
                            <h1 className="mb-5">Rate the <span className="text-primary text-uppercase"> Stadium</span>
                            </h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="room-item shadow rounded overflow-hidden">
                                    <div className="position-relative">
                                        <img className="img-fluid"
                                             src={"http://localhost:8080/api/storage?filePath=" + props.pitch?.images[0]?.name}
                                             alt=""/>
                                        <small
                                            className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                                            {props.pitch.price} Dh/ Player
                                        </small>
                                    </div>
                                    <div className="p-4 mt-2">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{props.pitch.name}</h5>
                                            <div className="ps-2">
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <small className="border-end me-3 pe-3"><i
                                                className="fa fa-bed text-primary me-2"/>{props.pitch.capacity} Player</small>
                                            <small className="border-end me-3 pe-3"><i
                                                className="fa fa-bath text-primary me-2"/>{props.pitch.covered ? 'Indoor' : 'Outdoor'}
                                            </small>
                                            <small><i className="fa fa-wifi text-primary me-2"/>{props.pitch.type}
                                            </small>
                                        </div>
                                        <p className="text-body mb-3">{props?.pitch?.location + ' ' + props?.pitch?.ville?.name}</p>
                                        <div className="d-flex justify-content-between">
                                            <Rate defaultValue={4} onChange={ratePitch} style={{color: "#FEA116"}}/>;
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/*<StadiumsList pitches={props.pitches}/>*/}
            </main>
            {/*<FooterClient/>*/}

            <JsFiles/>
            <Modal
                title="Invite Player"
                okText="Reserve Now"
                okClass="btn-primary"
                centered
                open={open}
                footer={null}
                // onOk={() => setOpen(false)}
                onCancel={() => router.push('/client/profile/reservations')}
                width={700}>
                <div className="container">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                                {/*<select className="form-select" name="card_type" onChange={handleChange}>*/}
                                {/*    <option value="Visa">Visa</option>*/}
                                {/*    <option value="Master Card">Master Card</option>*/}
                                {/*</select>*/}
                                {/*<label htmlFor="select1">Card type</label>*/}
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="select PLayer Id"
                                    onChange={handleInvitePlayerChange}
                                    optionLabelProp="label"
                                    defaultValue={props.players?.map(player => (player.id))}
                                >
                                    {props.allUsers?.map(user =>
                                        <Select.Option value={user.id} selected
                                                       label={user.first_name + ' ' + user.last_name}>{user.first_name + ' ' + user.last_name}</Select.Option>
                                    )}

                                </Select>

                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary w-100 py-3" type="button" onClick={invitePlayers}>
                                Invite Now
                            </button>
                        </div>
                    </div>

                </div>
            </Modal>
        </>

    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const {id} = context.query

    // const res = await fetch(`http://localhost:8080/api/pitches/` + id)
    // const pitches = await res.json()


    const res2 = await fetch(`http://localhost:8080/api/reservations/` + id)
    const reservation = await res2.json()

    const res3 = await fetch(`http://localhost:8080/api/pitches/` + reservation.pitch)
    const pitch = await res3.json()

    const playersIds = reservation.players.map(player => player + ',')
    const res4 = await fetch(`http://localhost:8080/api/users/byReservation?players_ids=` + playersIds)
    const players = await res4.json()

    const res5 = await fetch('http://localhost:8080/api/users')
    const allUsers = await res5.json()

    // Pass data to the page via props
    return {props: {pitch, reservation, players, allUsers, playersIds}}
}
