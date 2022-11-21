import Layout from "../../components/layout";
import ProductSelect from "../../components/productSelect";
import NewLotModal from "../../components/newLot";
import FermentedUHT from "../../components/fermentedUHT";
import { useState, useEffect } from "react";
import uuid from "react-uuid"

export default function Entry() {



  const [date, setDate] = useState("");
  const [productsByDate, setProductsByDate] = useState([]);
  const [productView, setProductView] = useState();

  useEffect(() => {
    let date = new Date();
    let formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    setDate(formattedDate);
  }, []);

  function handleLotChange(e) {
    setProductView(
      productsByDate.find((product) => product.lot === e.target.value)
    );
    console.log(productView);
  }

  function handleNewLot(newLot) {
    console.log(newLot)
    setProductsByDate(current=>[...current, newLot])
    console.log(productsByDate)
  }

  function handleSaveData(category, data) {
    setProductView({...productView, [category]: data})
  }

  return (
    <Layout title="Entry">
      <ProductSelect dir="entry" active="fermented" />
      <div className="bg-cyan-600">
        <div className="flex flex-col items-center bg-white rounded-md my-4 mx-auto min-w-[calc(100%-2rem)] p-4">
          <div className="text-4xl">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <NewLotModal handleSubmit={handleNewLot} />

          {(productsByDate.length > 0)
          ?<select onChange={handleLotChange}>
            <option value={null}>Select Lot</option>
            {productsByDate.map(item => (
              <option key={uuid()} value={item.lot}>{item.lot} - {item.type}</option>
            ))}
          </select>
          :null}
          
          {productView
          ? (
            <FermentedUHT product={productView.UHT} handleSaveData={handleSaveData} />
          )
          : null
        }

        </div>
      </div>
    </Layout>
  );
}
