import { useState, useEffect } from 'react'
import AdminMaster from "./AdminMaster"
import CustomerMaster from "./CustomerMaster";
import CashierMaster from "./CashierMaster";
import ImageLogin from "./assets/draw2.png"
import { useForm } from 'react-hook-form';
import client from "./assets/client"
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

export default function App() {
  const [page, setPage] = useState("loginform");
  const [barang, setBarang] = useState([]);
  const [user, setuser] = useState([])
  const [kategori, setKategori] = useState([]);
  const [merk, setMerk] = useState([]);
  const [product, setProduct] = useState([]);
  const [submit, setSubmit] = useState([]);
  const [purchase, setPurchase] = useState([])

  const fetchBarang = async () => {
    setBarang((await client.get("/barang")).data);
    setKategori((await client.get("/kategori")).data);
    setMerk((await client.get("/merk")).data);
    setuser((await client.get("/users")).data);
  }
  useEffect(() => {
    fetchBarang()
  }, [])
  const loginPage = async (data) => {
    const { username, password } = data
    const getsData = await client.get(`/users?username=${data.username}`);
    if (username == "admin" && password == "admin") {
      setPage("AdminMaster");
      return;
    } else if (getsData.data.length == 0) {
      alert("Username unknown")
      return;
    } else if (getsData.data[0].password != data.password) {
      alert("Password unknown")
    } else if (getsData.data[0].role === "PEMBELI") {
      setSubmit(getsData.data[0])
      setPage("CustomerMaster")
    } else {
      setSubmit(getsData.data[0])
      setPage("CashierMaster")
    }
  }
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "username can't be empty",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password can't be empty",
    }),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(schema) });

  return (
    <>
      {
        page == "loginform" &&
        <div className="cover selectdisable mx-auto mb-32 h-full">
          <section className="h-screen">
            <div className="h-full px-6 py-24">
              <div className="g-6 container mx-auto flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="mb-12 mx-auto ms-20 md:mb-0 md:w-8/12 lg:w-6/12">
                  <img
                    src={ImageLogin}
                    className="w-full rounded-xl"
                    alt="logologin" />
                </div>
                <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                  <div className="cover">
                    <div className="w-4/5 flex flex-col items-center justify-center mb-10">
                      <div className="text-4xl text-primary font-semibold" style={{ color: "coral" }}>Toko Suka Suka</div>
                    </div>
                    <form onSubmit={handleSubmit(loginPage)} className="space-y-4 md:space-y-6" action="" method="post">
                      <div>
                        <label htmlFor="username" className="block mb-2 text-2xl text-yellow font-semibold" style={{ color: "coral" }}>Username</label>
                        <input name="username"
                          {...register("username")}
                          className="bg-gray-50 border border-primary h-10 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Enter your username" />

                        <span className="h-5 ms-5" style={{ color: "red" }}>
                          {errors.username && (<p className="error text-sm text-red" style={{ color: "red" }}>{errors.username.message}</p>)}
                        </span>
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-2xl text-primary font-semibold" style={{ color: "coral" }}>Password</label>
                        <input
                          name="password"
                          {...register("password")}
                          className="bg-gray-50 border border-primary h-10 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" type="password" placeholder="Enter your password" />
                        <span className="h-5 ms-5" style={{ color: "red" }}>
                          {errors.password && (<p className="error text-sm text-primary" style={{ color: "red" }}>{errors.password.message}</p>)}
                        </span>
                      </div>
                      <div className="item-center">
                        <div className="kiri item-center mx-auto">
                          <button type="submit" className="block w-4/5 h-10 font-medium bg-gray-300 rounded-md hover:bg-amber-600 hover:text-white">Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      {page == "AdminMaster" && <AdminMaster setPage={setPage} setBarang={setBarang} barang={barang} merk={merk}></AdminMaster>}
      {page == "CashierMaster" && <CashierMaster setPage={setPage} setSubmit={setSubmit} setBarang={setBarang} barang={barang} merk={merk} submit={submit} kategori={kategori} product={product} setProduct={setProduct} purchase={purchase} setPurchase={setPurchase} user={user}></CashierMaster>}
      {page == "CustomerMaster" && <CustomerMaster setPage={setPage} setSubmit={setSubmit} setBarang={setBarang} barang={barang} merk={merk} submit={submit} kategori={kategori} product={product} setProduct={setProduct} purchase={purchase} setPurchase={setPurchase}></CustomerMaster>}
    </>
  )
}
