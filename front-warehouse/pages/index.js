import Head from "next/head";
import Image from "next/image";
import icono_warehouse from '../public/assets/images/icono_warehouse.png'
import image_select from '../public/assets/images/image_select.png'
import CustomSwitch from "../components/CustomSwitch/CustomSwitch";
import { useEffect, useState } from "react";
import axios from "axios";

const opctionsWareHouse = [
    'mini',
    'small',
    'middle',
    'big',
    'xBig',
    'plus'
]

const Index = () => {

    const [warehouse, setWarehouse] = useState({})

    useEffect(() => {

        let location = localStorage.getItem('geolocation').split(',')

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3001/warehouse/${location[0]}/${location[1]}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                setWarehouse(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className="row mx-5">
                <div className="col-md-7 pt-3">
                    <b style={{ fontSize: 20 }} >Tu plan inicial</b>
                    <div className="p-5">
                        <Image
                            src={image_select}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
                <div className="col-md-5">
                    <CustomSwitch />
                    <div className="container-plan" style={{ height: 500, overflow: 'auto' }}>
                        {
                            opctionsWareHouse.map(w => {
                                let wData = warehouse[w]
                                return (
                                    <div className="item-plan" key={w}>
                                        <div className="content-a">
                                            <label className="plan-name" >{w.toUpperCase()}</label>
                                            <label className="dimenssions">{wData?.height}m x {wData?.width}m (hasta {(wData?.height * wData?.width)} m3)</label>
                                            <label className="price" >${wData?.price} <span>MXN</span></label>
                                        </div>
                                        <div className="content-b top-1">
                                            <Image
                                                src={icono_warehouse}
                                                width={100}
                                                height={80}
                                                style={{
                                                    position: 'relative',
                                                    top: '-20px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;