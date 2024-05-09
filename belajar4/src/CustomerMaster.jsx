import React, { useState, useEffect } from 'react';
import logo from "./assets/logo2.jpg"
import logoP from "./assets/download.png"
import logoplay from "./assets/play.png"
import logoFound from "./assets/search.png"
import logoAcc from "./assets/accept.png"
import logoWait from "./assets/clock.png"
import logoReject from "./assets/decline.png"
import logoWar from "./assets/warning.png"

export default function CustomerMaster(props) {
    const [CategoryData, setCategoryData] = useState("")
    const [TitleBrandData, setTitleBrandData] = useState("")
    const [tempsTotals, setTempsTotals] = useState(props.barang);
    const [pages, setPages] = useState("home");
    const [ClaimData, setClaimData] = useState(false);
    let CurrentItem = 0;
    let CurrentProduct = 0;

    let temps = {
        name: props.submit.username,
        setPage: props.setPage,
    };

    function AddProduct(id) {
        let ProductBuyyer = props.product;
        let tempsIdx = ProductBuyyer.findIndex((e) => e.id == id);
        ProductBuyyer[tempsIdx].jml += 1;
        props.setProduct(ProductBuyyer);
        setClaimData(!ClaimData);
    }

    function dataProductLs(id) {
        let ProductBuyyer = props.product;
        let tempsIdx = ProductBuyyer.findIndex((e) => e.id == id);
        ProductBuyyer[tempsIdx].jml -= 1;
        if (ProductBuyyer[tempsIdx].jml == 0) ProductBuyyer.splice(tempsIdx, 1);
        props.setProduct(ProductBuyyer);
        setClaimData(!ClaimData);
    }

    function purchaseData() {
        let ProductBuyyer = props.product.filter((e) => e.iduser == props.submit.id)
        if (ProductBuyyer.length == 0) {
            alert("not found")
            return;
        }
        let productLeader = props.purchase;
        let id = "TR" + (parseInt(productLeader.length) + 1).toString().padStart(3, "0");
        const date = new Date();
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear().toString().padStart(4, "0");
        let currentDate = `${day}-${month}-${year}`;
        let datatrans = {
            id: id,
            iduser: props.submit.id,
            tanggal: currentDate,
            CurrentItem: CurrentItem,
            status: 0,
            barang: ProductBuyyer,
            idkasir: -1,
        };
        props.setProduct(props.product.filter(e => e.iduser != props.submit.id));
        props.setPurchase([...props.purchase, datatrans])
        setClaimData(!ClaimData);
    }

    const inputID = () => {
        if (CategoryData == "" && TitleBrandData != "") {
            let indexmerk = props.merk.findIndex((e) => e.nama == TitleBrandData) + 1;
            setTempsTotals(props.barang.filter((e) => { return e.merk == indexmerk }));
        } else if (CategoryData != "" && TitleBrandData == "") {
            let indexkategori = props.kategori.findIndex((e) => e.nama == CategoryData) + 1;
            setTempsTotals(props.barang.filter((e) => { return e.kategori.toString().includes(indexkategori) }));
        } else if (CategoryData != "" && TitleBrandData != "") {
            let indexmerk = props.merk.findIndex((e) => e.nama == TitleBrandData) + 1;
            let indexkategori = props.kategori.findIndex((e) => e.nama == CategoryData) + 1;
            setTempsTotals(props.barang.filter((e) => { return (e.merk == indexmerk && e.kategori.toString().includes(indexkategori)) }));
        } else {
            setTempsTotals(props.barang);
        }
    }
    useEffect(() => {
        inputID()
    }, [CategoryData, TitleBrandData])
    const addCart = (id) => {
        let dataDm = props.product;
        let tempsIdx = dataDm.findIndex((e) => e.id == id)
        if (tempsIdx == -1) {
            dataDm.push({ id: id, iduser: props.submit.id, jml: 1 })
        } else {
            dataDm[tempsIdx].jml += 1;
        }
        props.setProduct(dataDm);
    }

    const [isVisible, setIsVisible] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    }
    const refreshmerk = (temps) => {
        setTitleBrandData(temps);
    }
    const refreshkategori = (temps) => {
        setCategoryData(temps);
    }
    const formatIdr = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });


    const [isVisible3, setIsVisible3] = useState(true);
    const toggleVisibility3 = () => {
        setIsVisible3(!isVisible3);
    }
    return (
        <>
            <div className="cover shadow-2xl mx-auto" style={{ cursor: "pointer" }}>
                <div className="flex w-full mx-auto m-5">
                    <ul className="flex mx-auto">
                        <li className="mr-3">
                            <img src={logoP} className="w-10" alt="" />
                        </li>
                        <li className="mr-6">
                            <div className="text-3xl text-primary font-semibold w-full" style={{ color: "coral" }}><span style={{ color: "gray" }}>Welcome</span> {temps.name}</div>
                        </li>
                        <li className="ml-96">
                            <button onClick={() => { props.setPage("loginform") }} className="w-32 m-1 ml-64 h-8 mt-2 float-right text-gray-100 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary ">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
                <hr className="border-2" />
            </div>
            <div className="text-xs mt-4 mr-6 w-full text-amber-600" style={{ width: "100%" }}>
                <div className="w-8/12 flex container mx-auto">
                    <div className="text-2xl mt-4 font-semibold" style={{ color: "coral" }}>
                        {props.page == "home" ? "Resturant" : "Resturant"}
                    </div>
                    <div className="text-xs mt-7 ms-4 w-full text-amber-600" style={{ width: "100%" }}>
                        <marquee scrolldelay="150">Latest Quality Hp Surabaya Promo October 2023. Get a wide range of Hp Promo Surabaya products nearby with ease, free shipping & 2-hour delivery options. Latest Quality Hp Surabaya Promo October 2023. Get a wide range of Hp Promo Surabaya products nearby with ease, free shipping & 2-hour delivery options.</marquee>
                    </div>
                </div>            </div>
            <div className="cover flex container mt-5 mx-auto" style={{ cursor: "pointer" }}>
                <div className="kanan w-52">
                    <div className="col-4 mt-4 mb-5">
                        <div className="flex mt-4">
                            <img src={logoplay} className="w-5 h-5 mt-2" alt="" />
                            <label className="text-2xl ms-3 pb-1 w-28 bg-gray-300 font-semibold text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg"
                                onClick={() => { setPages("home") }}>
                                <p className="ps-1">Catalog</p> </label>
                        </div>
                    </div>
                    <hr className="border-2" />
                    <div className="col-4 mt-1 mb-4 ">
                        <div className="flex mt-4">
                            <img src={logoplay} className="w-5 h-5 mt-2" alt="" />
                            <label className="text-2xl w-28 ms-3 font-semibold text-amber-600 hover:bg-amber-600 pb-1 hover:text-white rounded-lg" onClick={toggleVisibility2}>
                                <p className="ps-1">Restorant</p>
                            </label>
                        </div>
                        {!isVisible2 && <div>
                            <select name="merk" className="h-8 text-amber-600 text-sm mt-3 border-0" onChange={(e) => refreshmerk(e.target.value)}>
                                {TitleBrandData == "" ? <option value="" selected></option> : <option value=""></option>}
                                {props.merk.map((e) => {
                                    return (
                                        <>
                                            {TitleBrandData == e.nama ? <option key={e.id} value={e.nama} selected>{e.nama}</option> : <option key={e.id} value={e.nama}>{e.nama}</option>}

                                        </>
                                    );
                                })}
                            </select>
                        </div>}
                    </div>
                    <hr className="border-2" />

                    <div className="col-4 mt-4 mb-5">
                        <div className="flex mt-4">
                            <img src={logoplay} className="w-5 h-5 mt-3" alt="" />
                            <label className="text-2xl ms-3 pt-1 w-28 font-semibold text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg" onClick={toggleVisibility} ><p className="ps-1">Category</p> </label>
                        </div>
                        {!isVisible && <div>
                            <select name="kategori" className="h-8 text-amber-600 text-sm mt-3 border-0" onChange={(e) => refreshkategori(e.target.value)}>
                                {CategoryData == "" ? <option className="h-5" value="" selected></option> : <option className="h-5" value=""></option>}
                                {props.kategori.map((e) => {
                                    return (
                                        <>
                                            {CategoryData == e.nama ? <option key={e.id} value={e.nama} selected>{e.nama}</option> : <option key={e.id} value={e.nama}>{e.nama}</option>}
                                        </>
                                    );
                                })}
                            </select>
                        </div>}
                    </div>
                    <hr className="border-2 mx-auto" />

                    <div className="mt-1 mb-4">
                        <div className="mt-4 flex">
                            <img src={logoplay} className="w-5 h-5 mt-2" alt="" />
                            <button className="text-2xl w-28 justify-content-start font-semibold text-amber-600 hover:bg-amber-600 pb-1 hover:text-white rounded-lg" onClick={() => { setPages("product") }}>Cart</button>
                        </div>
                    </div>
                    <hr className="border-2" />
                    <div className="col-4 mt-1 mb-4 ">
                        <div className="flex mt-4">
                            <img src={logoplay} className="w-5 h-5 mt-2" alt="" />
                            <button className="text-2xl w-28 font-semibold text-amber-600 hover:bg-amber-600 pb-1 hover:text-white rounded-lg" onClick={() => { setPages("History") }}>History</button>
                        </div>

                    </div>
                    <hr className="border-2" />
                </div>
                <div className="kiri w-full mx-auto">
                    {(pages == "home") && <>
                        <div className="grid grid-cols-4">
                            {tempsTotals.map((e, tempsIdx) => {
                                let types = "";
                                if (Array.isArray(e.kategori)) {
                                    for (let i = 0; i < e.kategori.length; i++) {
                                        types += props.kategori[e.kategori[i] - 1].nama;
                                        if (e.kategori.length != 1 && i < e.kategori.length - 1)
                                            types += ", ";
                                    }
                                } else {
                                    types = props.kategori[e.kategori - 1].nama;
                                }
                                return (
                                    <>
                                        <div key={tempsIdx} className="m-6 w-full hover:bg-gray-200 flex shadow-xl rounded-xl flex-col ps-3">
                                            <div className="card h-full">
                                                <div className="flex">
                                                    <div className="cover flex mt-3">
                                                        <img src={logo} className="w-72 rounded-lg ms-3" alt="" />
                                                        <div className="cover ms-10 float-right">
                                                            {e.qty < 10 && (
                                                                <div className="text-sm p-1 text-red-500" style={{ marginLeft: "-80px" }}>
                                                                    <img src={logoWar} className="w-8 bg-gray-200 rounded-lg p-1 h-8" alt="" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-60 shadow-xl rounded-xl">
                                                    <div className="isi ms-2">
                                                        <div className="text-2xl mt-4 font-semibold p-1 text-gray-700">Resturant {props.merk[e.merk - 1].nama}</div>
                                                        <div className="text-base font-semibold p-1 text-gray-700">{e.nama}</div>
                                                        <div className="text-base font-semibold p-1 text-gray-700">Price <span className="text-amber-600">{(formatIdr.format(e.harga))}</span></div>
                                                        <div className="text-base font-semibold p-1 text-gray-700">Stok <span className="text-amber-600">{e.qty}</span></div>
                                                        <div className="text-base font-semibold p-1 text-gray-700">Type {types}</div>

                                                    </div>
                                                    <hr className="border-2 mx-auto" />
                                                    <div className="ms-2 font-semibold p-1 text-gray-700" style={{ fontSize: "8px" }}>code ref <span className="text-amber-600">{e.id}</span></div>

                                                </div>
                                            </div>
                                            <div className="bg-gray-300 rounded-lg m-2 h-10">
                                                <button className="rounded text-xl font-semibold mx-auto h-10 w-full text-gray-500 hover:text-white hover:bg-amber-600 bg-gray-200" onClick={() => { addCart(e.id) }}>Buy</button>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </>}
                    <div className="bawah container ms-5 mx-auto w-full">
                        {pages == "product" && <>
                            <div className="isi">
                                <button className="w-32 m-1 ml-64 h-8 mt-2 mb-10 float-right text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary" onClick={() => { setPages("home") }} >
                                    Back
                                </button>
                            </div>
                            <div className="mx-auto">
                                <h3 className="ms-5 mt-3 text-center ps-72 text-3xl pt-2 text-amber-600 font-semibold">Cart</h3>
                                <div className="bg-gray-300 rounded-lg h-full mt-6">
                                    {props.product.filter(e => e.iduser == props.submit.id) == 0 ? (
                                        <div className="text-center flex h-72 mx-auto ms-20" >
                                            {/* <img src={logoFound} className="w-20 ms-96 h-20 mt-20 item-center" alt="" /> */}
                                            <iframe src="https://giphy.com/embed/SWVF41fAxIrwIyUr8b" width="580" height="353" frameBorder="0" className="w-72 ms-72 h-20 mt-20 item-center" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/B360ridingshirts-SWVF41fAxIrwIyUr8b"></a></p>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            {props.product.map((e, tempsIdx) => {

                                                if (e.iduser == props.submit.id) {
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
                                                    console.log(e.jml)
                                                    CurrentItem += subtotal;
                                                    CurrentProduct += e.jml;
                                                    return (
                                                        <>
                                                            <div key={tempsIdx} className="m-6 w-72 bg-white hover:bg-gray-200 flex shadow-xl rounded-xl flex-col ps-3" >
                                                                <div className="cover flex">
                                                                    <img src={logo} className="w-32 rounded-lg mt-3" alt="" />
                                                                    <div className="cover ms-10 float-right">
                                                                        {e.qty < 10 && (
                                                                            <div className="text-sm p-1 text-red-500">
                                                                                almost out
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-xs font-semibold p-1 text-gray-700">Code <span className="text-amber-600">{temps.id}</span></div>
                                                                </div>
                                                                <div className="m-1">
                                                                    <div className="isi h-52">
                                                                        <div className="text-xl font-bold p-1 text-gray-700">{temps.nama}</div>
                                                                        <div className="text-base font-semibold p-1 text-gray-700">
                                                                            {props.merk[temps.merk - 1].nama}
                                                                        </div>
                                                                        <div className="text-base font-semibold p-1 text-gray-700">Price <span className="text-amber-600 italic">{formatIdr.format(temps.harga)}</span></div>
                                                                        <div className="text-base font-semibold p-1 text-gray-700">Type {types}</div>
                                                                        <div className="text-base font-semibold p-1 text-gray-700">
                                                                            Subtotal: {(formatIdr.format(subtotal))}
                                                                        </div>
                                                                    </div>
                                                                    <hr className="border-2" />
                                                                    <div className="flex mx-auto ms-4 w-full item-center">
                                                                        <button className="w-20 m-1 h-8 mt-2 mb-2 float-right text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary" onClick={() => dataProductLs(temps.id)} >{"-"} </button>
                                                                        <div className="text-xl ms-5 mr-5 font-semibold text-amber-600 pt-2"> {e.jml}</div>
                                                                        <button className="w-20 m-1 h-8 mt-2 mb-2 float-right text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary" onClick={() => AddProduct(temps.id)}>{"+"}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>

                                                    );
                                                }
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="ms-3 m-3 bg-gray-300 w-ful h-40 rounded-lg shadow-2xl">
                                    <div className="pt-3">
                                        <div className="text-xl ms-4 font-semibold text-gray-700">Buyer : <span className="text-amber-600">{temps.name}</span></div>
                                        <div className="text-xl ms-4 font-semibold text-gray-700" >Total Items : <span className="text-amber-600">{CurrentProduct}</span></div>
                                        <div className="text-xl ms-4 font-semibold text-gray-700">Subtotal :  <span className="text-amber-600"> {formatIdr.format(CurrentItem)}</span></div>
                                        <hr className="border-2 mt-2" />

                                        <div className="flex">
                                            <button type="button" className="ms-5 mr-2 w-36 h-8 mt-2 text-lg float-right text-white bg-amber-600 rounded-lg hover:bg-gray-500" onClick={purchaseData}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>
                    {pages == "History" && <>
                        <div className="container w-full ms-5">
                            <>
                                <div className="isi ml-64">
                                    <button className="w-32 m-1 h-8 mt-2 mb-10 float-right text-amber-600 hover:bg-amber-600 hover:text-white font-medium text-lg bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-primary" onClick={() => { setPages("home") }} >
                                        Back
                                    </button>
                                </div>
                                <h3 className="mt-3 text-center ps-30 ms-14 text-3xl pt-2 text-amber-600 font-semibold">History</h3>

                                <div className="w-full item-center mx-auto">
                                    <div className="cover mt-10 w-full">
                                        <div className="isi m-4">
                                            <div className="grid grid-cols-4">
                                                {props.purchase.filter(e => e.iduser == props.submit.id) == 0 ? (
                                                    <div className="h-full flex mx-auto item-center ms-20">
                                                        <img src={logoFound} className="mx-auto ml-96" alt="" />
                                                    </div>
                                                ) : (
                                                    <div className="apa flex">
                                                        {props.purchase.map((e, tempsIdx) => {
                                                            if (e.iduser == props.submit.id) {
                                                                return (
                                                                    <div key={tempsIdx} className="m-6 w-96 hover:bg-gray-200 flex shadow-xl rounded-xl flex-col ps-3">
                                                                        <div className="card h-96 w-96" style={{ cursor: "pointer" }}>
                                                                            <h2 className="text-sm mt-4 font-bold p-1 text-gray-700 ms-7"><span className="text-amber-600">{e.id}</span></h2>
                                                                            <div className="ms-3 flex">
                                                                                <div className="gmbr">
                                                                                    <img src={logo} className="w-32 rounded-lg ms-2" alt="" />
                                                                                </div>
                                                                                <div className="cover ms-40 float-right mt-4">
                                                                                    {e.qty < 10 && (
                                                                                        <div className="text-sm ml-30 sm-5 text-red-500">
                                                                                            <img src={logoWar} className="w-6 h-6" alt="" />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex mt-3 mr-5">
                                                                                    {e.status == 0 ? (
                                                                                        <div className="pending">
                                                                                            <img src={logoWait} className="h-6 w-6 ms-2" alt="" />
                                                                                        </div>
                                                                                    ) : e.status == 1 ?
                                                                                        <div className="confirm">
                                                                                            <img src={logoAcc} className="h-6 w-6 ms-2" alt="" />
                                                                                        </div>
                                                                                        :
                                                                                        <div className="rejected">
                                                                                            <img src={logoReject} className="h-6 w-6 ms-2" alt="" />
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="cover bg-gray-300 w-80 ms-5 h-30 shadow-2xl rounded-lg">
                                                                                <div className="isi m-1">
                                                                                    <div className="text-xl mt-4 font-bold p-1 text-gray-700">Customer : <span className="text-amber-600"> {temps.name}</span></div>
                                                                                    <div className="text-xl font-bold p-1 text-gray-700">Transaction date : <span className="text-amber-600">{e.tanggal}</span></div>
                                                                                    <div className="text-xl font-bold p-1 text-gray-700">Subtotal :  <span className="text-amber-600">{formatIdr.format(e.CurrentItem)}</span></div>
                                                                                    <div className="text-xl font-bold p-1 text-gray-700">Has been paid :  <span className="text-amber-600">0</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}