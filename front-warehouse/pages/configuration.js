import Head from "next/head";
import Slider from '@mui/material/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import {
    faWarehouse,
    faEarthEurope,
    faFlag,
    faMapPin,
    faRoute,
    faLocation,
    faMoneyBill,
    faRuler
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { Client } from "@googlemaps/google-maps-services-js";


function Configuration() {
    const [coountry, setCoountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [colony, setColony] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [priceToKm, setPriceToKm] = useState(0)
    const [range, setRange] = useState(10)

    const [mini, setMini] = useState({})
    const [small, setSmall] = useState({})
    const [middle, setMiddle] = useState({})
    const [big, setBig] = useState({})
    const [xBig, setXBig] = useState({})
    const [plus, setPlus] = useState({})

    const [lisStates, setLisStates] = useState([])
    const [listMunicipaly, setLisMunicipaly] = useState([])
    const [listColony, setLisColony] = useState([])

    const SaveWarehouse = () => {
        console.log('manda a guardar')
        const data = {
            coountry: coountry,
            state: state,
            city: city,
            colony: colony,
            latitude: latitude,
            longitude: longitude,
            priceToKm: priceToKm,
            range: range,
            mini: mini,
            small: small,
            middle: middle,
            big: big,
            xBig: xBig,
            plus: plus
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/warehouse/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                alert(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        // ACA VAMOS A IR POR LA INFO DE LA BODEGA
        let objBase = {
            enable: false,
            price: 0,
            height: 0,
            width: 0
        }
        setMini(objBase)
        setSmall(objBase)
        setMiddle(objBase)
        setBig(objBase)
        setXBig(objBase)
        setPlus(objBase)

    }, [])

    useEffect(() => {
        let config = {
            method: 'get',
            url: 'http://localhost:3001/postalcode/state/00'
        };

        axios.request(config)
            .then((response) => {
                setLisStates(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const getMunicipaly = (state) => {
        let config = {
            method: 'get',
            url: `http://localhost:3001/postalcode/state/00/${state}`
        };

        axios.request(config)
            .then((response) => {
                setLisMunicipaly(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getColony = (state, munipaly) => {
        let config = {
            method: 'get',
            url: `http://localhost:3001/postalcode/state/00/${state}/${munipaly}`
        };

        axios.request(config)
            .then((response) => {
                setLisColony(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getLocation = (cp) => {
        const client = new Client({
        });

        client.geocode({
            params: {
                address: `mexico+cp+${cp}`,
                key: 'AIzaSyB7RbB9tmTWZi_a9h1hikiBePJmz9E6ChY'
            }
        }, axios).then(response => {
            var data = (response.data.results[0]).geometry.location
            setLatitude(data.lat)
            setLongitude(data.lng)
        })

    }

    // useEffect(()=>{
    //     console.log(mini)
    // },[mini])

    return (
        <>
            <Head>
                <title>Configuracion</title>
            </Head>
            <div className="row pt-2">
                <div className="col-3 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faEarthEurope} />
                    <label htmlFor="txtCountry" className="form-label">Pais</label>
                    <select id="txtCountry" className="form-select form-select-sm" disabled
                        onChange={(e) => setCoountry(e.target.value)} value={'01'}
                    >
                        <option value="00">-----</option>
                        <option value="01">Mexico</option>
                    </select>
                </div>
                <div className="col-3 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faFlag} />
                    <label htmlFor="txtState" className="form-label">Estado</label>
                    <select id="txtState" className="form-select form-select-sm"
                        onChange={(e) => {
                            setState(e.target.value)
                            getMunicipaly(e.target.value)
                        }}
                    >
                        <option value="00">- - - </option>
                        {
                            lisStates.map(f => {
                                return (<option key={f.c_estado} value={f.c_estado}>{f.d_estado}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="col-3 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faRoute} />
                    <label htmlFor="txtMunicipaly" className="form-label">Municipio</label>
                    <select id="txtMunicipaly" className="form-select form-select-sm"
                        onChange={(e) => {
                            setCity(e.target.value)
                            getColony(state, e.target.value)
                        }}
                    >
                        <option value="00">- - - </option>
                        {
                            listMunicipaly.map(f => {
                                return (<option key={f.c_mnpio} value={f.c_mnpio}>{f.D_mnpio}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="col-3 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faLocation} />
                    <label htmlFor="txtColony" className="form-label">Colinia</label>
                    <select id="txtColony" className="form-select form-select-sm"
                        onChange={(e) => {
                            setColony(e.target.value)
                            getLocation(e.target.options[e.target.selectedIndex].dataset.cp)
                        }}
                    >
                        <option value="00">- - - </option>
                        {
                            listColony.map(f => {
                                return (<option key={f.id_asenta_cpcons} value={f.id_asenta_cpcons} data-cp={f.d_codigo} >{f.d_asenta}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="col-5 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faMapPin} />
                    <label htmlFor="txtLatitud" className="form-label">Latitud</label>
                    <input type="number" className="form-control form-control-sm" id="txtLatitud" disabled
                        onChange={(e) => setLatitude(e.target.value)}
                        value={latitude}
                    />
                </div>
                <div className="col-5 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faMapPin} />
                    <label htmlFor="txtLongitud" className="form-label">Longitud</label>
                    <input type="number" className="form-control form-control-sm" id="txtLongitud" disabled
                        onChange={(e) => setLongitude(e.target.value)}
                        value={longitude}
                    />
                </div>
                <div className="col-2 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faMoneyBill} />
                    <label htmlFor="txtPriceToKM" className="form-label">Precio por KM</label>
                    <input type="number" className="form-control form-control-sm" id="txtPriceToKM"
                        onChange={(e) => setPriceToKm(e.target.value)}
                    />
                </div>
                <div className="col-12 mb-2">
                    <FontAwesomeIcon className="p-1"
                        style={{ height: 30, color: '#06ac57' }}
                        icon={faRuler} />
                    <label htmlFor="txtRange" className="form-label">Rango de servicio {range} KM</label>
                    <Slider
                        defaultValue={10}
                        onChange={(e) => setRange(e.target.value)}
                    />
                </div>
                <div className="col-12 border border-info-subtle p-0 overflow-x-scroll">

                    {/* MINI */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkMini"
                                    onClick={(e) => {
                                        setMini({
                                            enable: mini.enable ? false : true,
                                            price: mini.price,
                                            height: mini.height,
                                            width: mini.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkMini">Mini</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtMiniPrice" placeholder="Precio $$$"
                                    onChange={(e) => {
                                        setMini({
                                            enable: mini.enable,
                                            price: e.target.value,
                                            height: mini.height,
                                            width: mini.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtMiniLatitud" placeholder="Alto (m)"
                                    onChange={(e) => {
                                        setMini({
                                            enable: mini.enable,
                                            price: mini.price,
                                            height: e.target.value,
                                            width: mini.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtMiniLongitud" placeholder="Ancho (m)"
                                    onChange={(e) => {
                                        setMini({
                                            enable: mini.enable,
                                            price: mini.price,
                                            height: mini.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SMALL */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkSmall"
                                    onClick={(e) => {
                                        setSmall({
                                            enable: small.enable ? false : true,
                                            price: small.price,
                                            height: small.height,
                                            width: small.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkSmall">Chico</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtSmallPrice" placeholder="Precio $$$"
                                    onChange={(e) => {
                                        setSmall({
                                            enable: small.enable,
                                            price: e.target.value,
                                            height: small.height,
                                            width: small.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtSmallLatitud" placeholder="Alto (m)"
                                    onChange={(e) => {
                                        setSmall({
                                            enable: small.enable,
                                            price: small.price,
                                            height: e.target.value,
                                            width: small.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtSmallLongitud" placeholder="Ancho (m)"
                                    onChange={(e) => {
                                        setSmall({
                                            enable: small.enable,
                                            price: small.price,
                                            height: small.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkMiddle"
                                    onClick={(e) => {
                                        setMiddle({
                                            enable: middle.enable ? false : true,
                                            price: middle.price,
                                            height: middle.height,
                                            width: middle.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkMiddle">Mediano</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtMiddlePrice" placeholder="Precio $$$"
                                    onChange={(e) => {
                                        setMiddle({
                                            enable: middle.enable,
                                            price: e.target.value,
                                            height: middle.height,
                                            width: middle.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtMiddleLatitud" placeholder="Alto (m)"
                                    onChange={(e) => {
                                        setMiddle({
                                            enable: middle.enable,
                                            price: middle.price,
                                            height: e.target.value,
                                            width: middle.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtMiddleLongitud" placeholder="Ancho (m)"
                                    onChange={(e) => {
                                        setMiddle({
                                            enable: middle.enable,
                                            price: middle.price,
                                            height: middle.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* BIG */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkBig"
                                    onClick={(e) => {
                                        setBig({
                                            enable: big.enable ? false : true,
                                            price: big.price,
                                            height: big.height,
                                            width: big.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkBig">Grande</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtBigPrice" placeholder="Precio $$$"
                                    onClick={(e) => {
                                        setBig({
                                            enable: big.enable,
                                            price: e.target.value,
                                            height: big.height,
                                            width: big.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtBigLatitud" placeholder="Alto (m)"
                                    onClick={(e) => {
                                        setBig({
                                            enable: big.enable,
                                            price: big.price,
                                            height: e.target.value,
                                            width: big.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtBigLongitud" placeholder="Ancho (m)"
                                    onClick={(e) => {
                                        setBig({
                                            enable: big.enable,
                                            price: big.price,
                                            height: big.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* XBIG */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkxBig"
                                    onClick={(e) => {
                                        setXBig({
                                            enable: mini.enable ? false : true,
                                            price: mini.price,
                                            height: mini.height,
                                            width: mini.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkxBig">X-Grande</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtXBigPrice" placeholder="Precio $$$"
                                    onClick={(e) => {
                                        setXBig({
                                            enable: xBig.enable ? false : true,
                                            price: e.target.value,
                                            height: xBig.height,
                                            width: xBig.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtXBigLatitud" placeholder="Alto (m)"
                                    onClick={(e) => {
                                        setXBig({
                                            enable: xBig.enable,
                                            price: xBig.price,
                                            height: e.target.value,
                                            width: xBig.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtXBigLongitud" placeholder="Ancho (m)"
                                    onClick={(e) => {
                                        setXBig({
                                            enable: xBig.enable,
                                            price: xBig.price,
                                            height: xBig.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* PLUS */}
                    <div className="card m-2 col-2 d-inline-block">
                        <div className="card-header">
                            <FontAwesomeIcon
                                style={{ height: 15, position: 'absolute', left: 12, top: 11, color: '#06ac57' }}
                                icon={faWarehouse} />
                            <div className="form-check form-switch form-check-reverse">
                                <input className="form-check-input" type="checkbox" id="chkPlus"
                                    onClick={(e) => {
                                        setPlus({
                                            enable: plus.enable ? false : true,
                                            price: plus.price,
                                            height: plus.height,
                                            width: plus.width
                                        })
                                    }}
                                />
                                <label className="form-check-label" htmlFor="chkxBig">Plus</label>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtXPlusPrice" placeholder="Precio $$$"
                                    onClick={(e) => {
                                        setPlus({
                                            enable: plus.enable,
                                            price: e.target.value,
                                            height: plus.height,
                                            width: plus.width
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control form-control-sm" id="txtXPlusLatitud" placeholder="Alto (m)"
                                    onClick={(e) => {
                                        setPlus({
                                            enable: plus.enable,
                                            price: plus.price,
                                            height: e.target.value,
                                            width: plus.width
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <input type="number" className="form-control form-control-sm" id="txtXPlusLongitud" placeholder="Ancho (m)"
                                    onClick={(e) => {
                                        setPlus({
                                            enable: plus.enable,
                                            price: plus.price,
                                            height: plus.height,
                                            width: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                </div>
                <button type="submit" className="btn btn-success mt-3" onClick={SaveWarehouse} >Guardar</button>
            </div>
        </>
    );
}

export default Configuration;