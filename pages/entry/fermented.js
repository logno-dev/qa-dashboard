import Layout from "../../components/layout";
import ProductSelect from "../../components/productSelect";
import FermentedProductData from "../../components/fermentedProductData";
import { useState, useEffect } from "react";

export default function Entry() {
  const tempProduct = [
    {
      _id: 871098719348598,
      lot: "103022-2200",
      type: "Yogurt",
      date: "10-30-2022",
      tank: "2200",
      UHT: {
        tankStart: 0,
        agStart: "8:00",
        innoc: "8:15",
        innocBy: "LB",
        flashPSI: 140,
        agEnd: "10:15",
      },
      transfer: {
        breakTime: "2:00",
        pH: 4.87,
        speed: 140,
        temp: 82,
        whiteMassWeight: 33000,
        holdWeightStart: 12,
        holdWeightEnd: 32920,
        transferBy: "LB",
      },
      batching: [
        {
          batchNum: 1,
          solids: 14.83,
          pH: 5.32,
          brix: 3.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 2,
          solids: 14.97,
          pH: 5.41,
          brix: 3.2,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 3,
          solids: 15.12,
          pH: 5.47,
          brix: 3.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 4,
          solids: 14.75,
          pH: 5.3,
          brix: 3.6,
          sensory: "pass",
          initial: "LB",
        },
      ],
      fermentation: [
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
      ],
      finishedProduct: [
        {
          flavor: "Plain",
          size: 24,
          labelVersion: "092822",
          BME: [
            {
              sample: "B",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "M",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "E",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
          ],
        },
        {
          flavor: "Vanilla",
          size: 24,
          labelVersion: "092822",
          BME: [
            {
              sample: "B",
              bbDate: "1-12-23",
              time: "12:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "M",
              bbDate: "1-12-23",
              time: "12:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "E",
              bbDate: "1-12-23",
              time: "12:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labelVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
          ],
        },
      ],
    },
    {
      _id: 8710987123452345,
      lot: "103022-3000",
      type: "Yogurt",
      date: "10-30-2022",
      tank: "3000",
      UHT: {
        tankStart: 0,
        agStart: "13:00",
        innoc: "13:15",
        innocBy: "LB",
        flashPSI: 140,
        agEnd: "15:15",
      },
      transfer: {
        breakTime: "4:00",
        pH: 4.63,
        speed: 140,
        temp: 82,
        whiteMassWeight: 22000,
        holdWeightStart: 10,
        holdWeightEnd: 19920,
        transferBy: "LB",
      },
      batching: [
        {
          batchNum: 1,
          solids: 14.63,
          pH: 5.32,
          brix: 3.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 2,
          solids: 14.47,
          pH: 5.41,
          brix: 3.2,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 3,
          solids: 15.02,
          pH: 5.47,
          brix: 3.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          batchNum: 4,
          solids: 14.85,
          pH: 5.3,
          brix: 3.6,
          sensory: "pass",
          initial: "LB",
        },
      ],
      fermentation: [
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
        {
          time: "14:00",
          solids: 14.32,
          temp: 108,
          pH: 5.21,
          brix: 6.1,
          sensory: "pass",
          initial: "LB",
        },
      ],
      finishedProduct: [
        {
          flavor: "Vanilla",
          size: 24,
          labelVersion: "092822",
          BME: [
            {
              sample: "B",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labalVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "M",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labalVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
            {
              sample: "E",
              bbDate: "1-12-23",
              time: "8:12",
              temp: 72,
              solids: 20.02,
              pH: 4.22,
              brix: 10.2,
              labalVersion: "092822",
              initial: "LB",
              viscosity: null,
              review: null,
              shelfLife: null,
            },
          ],
        },
      ],
    },
  ];

  console.log;

  const [date, setDate] = useState("");
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
      tempProduct.find((product) => product.lot === e.target.value)
    );
    console.log(productView);
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
          <div className="text-3xl">+ Add New Lot</div>
          <div className="text-lg">
            <ul>
              <li>
                Lot:{" "}
                {tempProduct.length > 0 ? (
                  <select
                    id="lot"
                    name="lot"
                    onChange={(e) => handleLotChange(e)}
                  >
                    <option value="">Select Lot</option>
                    {tempProduct.map((lot) => (
                      <option key={lot.lot} value={lot.lot}>
                        {lot.lot}
                      </option>
                    ))}
                  </select>
                ) : null}
              </li>
              <li>Type: </li>
              <li>Date: 10/30/2022</li>
              <li>Tank: 2200</li>
            </ul>
          </div>
          {productView? 
          <FermentedProductData product={productView}/>
          : null }
        </div>
      </div>
    </Layout>
  );
}
