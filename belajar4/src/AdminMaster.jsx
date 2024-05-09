import { useState } from "react";
import { useEffect } from "react";
import logo from "./assets/logo2.jpg"
import logoP from "./assets/download.png"
import logoWar from "./assets/warning.png"
import Joi from "joi";

export default function AdminMaster(props) {
    const [page] = useState("stayathome");
    const [totalProduct, setTotalProduct] = useState(-1);
    const [listProduct, SetListProduct] = useState("");
    let [index, setIndex] = useState(-1);
    let data = { setPage: props.setPage };
    const dataList = (idx) => {
        let data = props.barang.filter((e) => { return e.id == idx });

        SetListProduct(idx)
    };
    const formatIdr = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

    });

    const productSell = () => {
        let dataDm = props.barang;
        if (totalProduct < 0) {
            setTotalProduct(0)
            alert("minimum item 0"); document.getElementById("totalAddProduct").value = 0;
            return;
        }
        let indexdata = dataDm.findIndex((e) => e.id == listProduct);
        dataDm[indexdata].qty += parseInt(totalProduct);
        props.setBarang(dataDm);
        setTotalProduct(0);
        document.getElementById("totalAddProduct").value = 0;
    }

    return (
        <>
            <div className="cover shadow-2xl mx-auto">
                <div className="flex w-full mx-auto m-5">
                    <ul className="flex mx-auto">
                        <li className="mr-3">
                            <img src={logoP} className="w-10" alt="" />
                        </li>
                        <li className="mr-6">
                            <div className="text-3xl text-primary font-semibold w-full" style={{ color: "coral" }}><span {...data} style={{ color: "gray" }}>Welcome </span>Admin</div>
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
            <div className="w-full flex flex-col items-center">
                <div className="w-8/12 flex container">
                    <div className="text-2xl mt-4 font-semibold" style={{ color: "coral" }}>
                        {page == "stayathome" ? "Collections" : "Add New Items"}
                    </div>
                    <div className="text-xs mt-7 ms-4 w-full text-amber-600" style={{ width: "100%" }}>
                        <marquee scrolldelay="150">Latest Quality Hp Surabaya Promo October 2023. Get a wide range of Hp Promo Surabaya products nearby with ease, free shipping & 2-hour delivery options. Latest Quality Hp Surabaya Promo October 2023. Get a wide range of Hp Promo Surabaya products nearby with ease, free shipping & 2-hour delivery options.</marquee>
                    </div>
                </div>
            </div>
            <div className="cover flex container mt-5 mx-auto">
                <div className="kanan w-52">
                    <div className="text-2xl mt-4 font-semibold text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg"><p className="ps-1">Profile</p></div>
                    <div className="text-2xl mt-4 font-semibold text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg"><p className="ps-1">Target</p></div>
                    <div className="text-2xl mt-4 font-semibold text-amber-600 bg-gray-300 hover:bg-amber-600 hover:text-white rounded-lg">
                        <p className="ps-1">Master</p>
                    </div>

                </div>
                <div className="kiri w-full">
                    <div className="grid grid-cols-4">
                        {props.barang.map((e, index) => {
                            return (
                                <>
                                    <div key={index} className="m-6 h-96 w-full hover:bg-gray-200 flex shadow-xl rounded-xl flex-col ps-3">
                                        <div className="card h-full h-80" onClick={() => { dataList(e.id) }} style={{ cursor: "pointer" }} >
                                            <div className="flex">
                                                <input type="checkbox" className="w-5 h-5 border-amber-600 rounded-sm mt-5" />
                                                <div className="cover flex">
                                                    <img src={logo} className="w-32 mt-5 rounded-lg ms-2" alt="" />
                                                    <div className="cover ms-20 float-right mt-4">
                                                        {e.qty < 10 && (
                                                            <div className="text-sm sm-5 text-red-500">
                                                                <img src={logoWar} className="w-6 h-6" alt="" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card m-3">
                                                <div className="text-xl font-bold p-1 text-gray-700">{e.nama}</div>
                                                <div className="h-42 shadow-xl rounded-xl">
                                                    <div className="text-base font-semibold p-1 text-gray-700">Price <span className="text-amber-600 italic">{formatIdr.format(e.harga)}</span></div>
                                                    <div className="text-base font-semibold p-1 text-gray-700">Stok <span className="text-amber-600">{e.qty}</span></div>
                                                    <div className="text-xs font-semibold p-1 text-gray-700">Code <span className="text-amber-600">{e.id}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 mx-auto d-flex justify-content center align-items-center text-primary">
                                            <div className="flex w-full">
                                                <p id="text">Quantity: </p>
                                                <input type="number" className="ms-2 h-7 w-20 border-amber-600 rounded" id="totalAddProduct" placeholder="Jumlah" defaultValue={0} onChange={(e) => { setTotalProduct(e.target.value) }} />
                                                <button className="w-16 h-7 text-sm text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-sm ms-3 text-center bg-primary " onClick={productSell}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}