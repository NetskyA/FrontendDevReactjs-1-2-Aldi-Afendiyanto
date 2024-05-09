import React, { useState, useEffect } from 'react';
import logo from "./assets/logo2.jpg"
import logoP from "./assets/download.png"
import logoplay from "./assets/play.png"
import logoAcc from "./assets/accept.png"
import logoWait from "./assets/clock.png"
import logoReject from "./assets/decline.png"
import logoOpen from "./assets/open.png"
import logoFound from "./assets/search.png"

export default function CashierMaster(props) {
    const [page, setPage] = useState("home");
    const [nota, setNota] = useState(null);
    function dataBarangSearch() {
        let value = document.getElementById("inputID").value;
        let CheckProduct = props.purchase.filter((e) => e.id == value);
        if (CheckProduct.length == 0) {
            alert(
                "not found product"
            )
            return;
        }
        setNota(CheckProduct);
    }

    let temps = {
        name: props.submit.username,
        setPage: props.setPage,
    };
    const formatIdr = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

    });

    const [isVisible1, setIsVisible1] = useState(true);
    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
    }

    const [isVisible2, setIsVisible2] = useState(true);
    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    }

    const [isVisible3, setIsVisible3] = useState(true);
    const toggleVisibility3 = () => {
        setIsVisible3(!isVisible3);
    }

    const accProduct = indicatorProduct => {
        let dataDm = -1
        let ProductListSave = props.purchase;
        let BuyProduct = props.purchase.findIndex(e => e.id == nota[0].id);
        if (indicatorProduct == "accept") {
            dataDm = 1; let ProductSave = props.barang;
            for (let i = 0; i < nota[0].barang.length; i++) {
                let tempsProduct = ProductSave.findIndex(e => e.id == nota[0].barang[i].id);
                ProductSave[tempsProduct].qty -= parseInt(nota[0].barang[i].jml);
            }
            props.setBarang(ProductSave)
        }
        ProductListSave[BuyProduct].status = dataDm; ProductListSave[BuyProduct].idkasir = props.submit.id; props.setPurchase(ProductListSave);
    }


    function ListProductSell() {
        let Indicator;
        if (nota[0].status == 0) {
            Indicator = <img src={logoWait} className="mt-4 ms-2 w-7 h-7" alt="" />
        } else if (nota[0].status == 1) {
            Indicator = <img src={logoAcc} className="mt-4 ms-2 w-7 h-7" alt="" />
        } else {
            Indicator = <img src={logoReject} className="mt-4 ms-2 w-7 h-7" alt="" />
        }
        return (
            <>
                <div className="grid grid-cols">
                    <div className="m-6 w-full hover:bg-gray-100 flex shadow-xl rounded-xl flex-col ps-3">
                        <div className="card h-full">
                            <div className="flex">
                                <div className="cover flex mt-2">
                                    <img src={logo} className="ms-3 w-72 rounded" alt="" />
                                </div>
                                <div className="ms-72 mt-5 flex float-right">
                                    <div className="ms-72 text-lg text-amber-600 font-semibold pt-4">{nota[0].id}</div>
                                    <div className="">{Indicator}</div>
                                </div>
                            </div>
                            <div className="cover h-92 shadow-xl">
                                <div className="row text-lg ms-3 font-semibold">
                                    <div className="bebas">
                                        Customer : <span className="text-amber-600">{props.user[nota[0].iduser - 1].username}</span>
                                    </div>
                                    <div className="bebas">
                                        Transaction date : <span className="text-amber-600"> {nota[0].tanggal}</span>
                                    </div>
                                    <div className="bebas">
                                        Subtotal : <span className="text-amber-600">{formatIdr.format(nota[0].CurrentItem)}</span>
                                    </div>
                                    <div className="flex me-5 mt-2 mb-4">
                                        {nota[0].status == 0 && (
                                            <>
                                                <button type="button" className="hover:bg-amber-600 mt-2 w-52 font-semibold bg-gray-300 text-gray-600 h-7hover:text-white rounded" onClick={() => accProduct("dec")}>Decline </button>
                                                <button type="button" className="bg-amber-600 mt-2 ms-5 w-52 font-semibold hover:bg-gray-300 hover:text-gray-600 h-7 text-white rounded" onClick={() => accProduct("accept")} > Accept</button>
                                            </>
                                        )}
                                    </div>
                                    <hr className="border-2 bg-gray-400" />
                                    <p className="text-xs italic font-thin text-amber-600">*before accept or decline must view arrow details</p>
                                    <div className="bebas mx-auto text-center mt-3">
                                        <div className="item-center" onClick={toggleVisibility3}>
                                            <img src={logoOpen} className="item-center text-center mb-2 mx-auto h-7" alt="" />
                                        </div>
                                    </div>
                                    {!isVisible3 &&
                                        <>
                                            <div className="isi" >
                                                <div className="cover">
                                                    {nota[0].barang.map((e, index) => {
                                                        let temps =
                                                            props.barang[props.barang.findIndex((bar) => bar.id == e.id)];
                                                        let types = "";
                                                        if (Array.isArray(temps.kategori)) {
                                                            for (let i = 0; i < temps.kategori.length; i++) {
                                                                types += props.kategori[temps.kategori[i] - 1].nama;
                                                                if (
                                                                    temps.kategori.length != 1 &&
                                                                    i < temps.kategori.length - 1
                                                                )
                                                                    types += ",";
                                                            }
                                                        } else {
                                                            types = props.kategori[temps.kategori - 1].nama;
                                                        }
                                                        let subtotal = temps.harga * e.jml;
                                                        return (
                                                            <div key={index} className="w-full hover:bg-gray-200 flex mb-5 rounded-xl flex-col ps-3">
                                                                <div className="card mb-6">
                                                                    <div className="text-xl text-gray-600">{temps.nama}</div>
                                                                    <div className="text-base text-gray-600">{props.merk[temps.merk - 1].nama}</div>
                                                                    <div className="text-base text-gray-600">Code : {temps.id}</div>
                                                                    <div className="text-base text-gray-600">Price {formatIdr.format(temps.harga)}</div>
                                                                    <div className="text-base text-gray-600">Type: {types}</div>

                                                                    <div className="text-base text-gray-600">Quatity: {e.jml}</div>

                                                                    <div className="text-base text-gray-600">
                                                                        Subtotal: {formatIdr.format(subtotal)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="cover">
                <div className="cover shadow-2xl mx-auto">
                    <div className="flex w-full mx-auto m-5">
                        <ul className="flex mx-auto">
                            <li className="mr-3">
                                <img src={logoP} className="w-10" alt="" />
                            </li>
                            <li className="mr-6">
                                <div className="text-3xl text-primary font-semibold w-full" style={{ color: "coral" }}><span style={{ color: "gray" }}>Welcome</span> {temps.name}</div>
                            </li>
                            <li className="ml-96">
                                <button onClick={() => { props.setPage("loginform") }} className="w-32 m-1 ml-64 h-8 mt-2 float-right text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary ">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <hr className="border-2" />
                </div>
            </div>
            <div className="cover flex container mx-auto">
                <div className="kanan w-96 mt-5">
                    {page == "home" && <>
                        <div className="cover" style={{ cursor: "pointer" }}>
                            <div className="isi h-32 w-full">
                                <div className="w-full h-4/6">
                                    <div className="isi mt-5 flex">
                                        <img src={logoplay} className="w-6 h-6 mt-2" />
                                        <div className="text-xl font-semibold text-amber-600 ms-1 mt-2" onClick={toggleVisibility1} >Search </div>
                                    </div>
                                    {!isVisible1 &&
                                        <>
                                            <div className="isi flex">
                                                <input type="text" id="inputID" className="m-2 bg-gray-300 w-30 h-7 mr-2 rounded-sm border-0" />
                                                <button className="bg-amber-600 mt-2 w-16 font-semibold hover:bg-gray-300 hover:text-gray-600 h-7 text-white rounded" onClick={dataBarangSearch} >
                                                    Cek
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                                <hr className="border-2" />
                                <div className="w-full h-4/6">
                                    <div className="isi mt-5 flex">
                                        <img src={logoplay} className="w-6 h-6 mt-2" />
                                        <div className="text-xl font-semibold text-amber-600 ms-1 mt-2" onClick={toggleVisibility2} >History </div>
                                    </div>
                                    {!isVisible2 && <>
                                        <button className="bg-amber-600 mt-2 w-full font-semibold hover:bg-gray-300 hover:text-gray-600 h-7 text-white rounded" onClick={() => { setPage("history"); }}>
                                            History
                                        </button>
                                    </>}
                                </div>
                                <hr className="border-2" />
                            </div>
                        </div>
                    </>}
                </div>
                <div className="kiri w-full">
                    {(page == "home" && nota) && <ListProductSell />}
                    {page == "history" &&
                        <>
                            <div className="flex">
                                <div className="rounded mx-2" >
                                    <div className="isi flex">
                                        <div className="mt-3 text-3xl pt-2 mr-56 text-amber-600 font-semibold">History</div>
                                        <button className="w-32 m-1 mt-6 ms-96 h-8 mt-2 mb-10 text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary" onClick={() => { setPage("home") }} >
                                            Back
                                        </button>
                                    </div>
                                    {props.purchase.filter(e => e.idkasir == props.submit.id) == 0 ? (
                                        <div className="cover h-72">
                                            <div className="isi ml-40 mt-52">
                                                <img src={logoFound} className="w-14 h-14 ml-72 text-center item-center mx-auto" alt="" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2">
                                            {props.purchase.map((e, index) => {
                                                if (e.idkasir == props.submit.id) {
                                                    return (
                                                        <div key={index} className="m-6 w hover:bg-gray-200 flex shadow-xl rounded-xl flex-col ps-3" >
                                                            <div className="card-body h-100 ms-1 mb-5">
                                                                <div className="cover flex">
                                                                    <img src={logo} className="w-64 rounded-lg mt-3" alt="" />
                                                                    <div className="cover mr-4 float-right">
                                                                        {e.status == 0 ? (<img src={logoWait} className="mt-1 ms-2 w-7 h-7" alt="" style={{ marginLeft: "-33px", position: "absolute" }} />)
                                                                            : e.status == 1 ? <img src={logoAcc} className="mt-4 w-7 h-7" alt="" style={{ marginLeft: "-33px", position: "absolute" }} /> : <img src={logoReject} className="mt-3 ms-10 w-9 h-9" alt="" style={{ marginLeft: "-33px", position: "absolute" }} />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="text-base font-semibold text-gray-500">{e.id}</div>
                                                                <div className="text-base font-semibold text-gray-500">Transaction date  : {e.tanggal}</div>
                                                                <div className="text-base font-semibold text-gray-500">Subtotal : {formatIdr.format(e.CurrentItem)}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    )}
                                    <div className="">
                                        <div className="isi">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}