import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import AnalNav from "../../../components/analysis/nav";
import Layout from "../../../components/layout";
import ReportDisplayBlock from "../../../components/reportDisplayBlock";
import ReportFinishedDisplay from "../../../components/reportFinishedDisplay";
// import ClientPromise from "../../lib/mongodb"




export default function Analysis() {

  const [items, setItems] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  async function getData() {
    const res = await fetch(`/api/getSummary?collection=finishedProduct&start=${startDate}&end=${endDate}`, {
      method: "GET",
    })
    const data = await res.json()
    setItems(data)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    getData()
  }

  return (
    <>
      <Layout>

        <div className=" flex flex-col items-center">

          <AnalNav />

          <div className="body-wrapper data-entry flex flex-col items-center p-4 ">
            <h2>Finished Product Spreadsheet View</h2>
            <form id="filter" className="flex m-4 gap-2 items-center">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
              {(startDate && endDate) ? (
                <button className="button" type="button" onClick={handleFormSubmit}>Get Summary</button>
              ) :
                <button className="button-disabled" type="button" onClick={e => e.preventDefault}>Get Summary</button>
              }
            </form>
            {items ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Type
                      </th>
                      <th>
                        Flavor
                      </th>
                      <th>
                        Size
                      </th>
                      <th>
                        Prod Date
                      </th>
                      <th>
                        EB Date
                      </th>
                      <th>
                        Circuit
                      </th>
                      <th>
                        Pull
                      </th>
                      <th>
                        Time
                      </th>
                      <th>
                        Temp
                      </th>
                      <th>
                        Solids
                      </th>
                      <th>
                        pH
                      </th>
                      <th>
                        Brix
                      </th>
                      <th>
                        Visc 1
                      </th>
                      <th>
                        Visc Final
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {items.map(item => (
                      <>
                        {
                          item.samples.map(sample => (
                            <tr key={item.id + sample.time}>
                              <td key={uuid()}>{item.type === "fermented" ? item.subType : item.type}</td>
                              <td key={uuid()}>{item.flavor}</td>
                              <td key={uuid()}>{item.size}</td>
                              <td key={uuid()}>{format(new Date(item.dateAdded), "yyyy-MM-dd")}</td>
                              <td key={uuid()}>{sample.enjoyBy}</td>
                              <td key={uuid()}>{sample.fermCircuit}</td>
                              <td key={uuid()}>{sample.BME}</td>
                              <td key={uuid()}>{sample.time}</td>
                              <td key={uuid()}>{sample.temp}</td>
                              <td key={uuid()}>{sample.solids}</td>
                              <td key={uuid()}>{sample.pH}</td>
                              <td key={uuid()}>{sample.brix}</td>
                              <td key={uuid()}>{sample.viscosityDayOne}</td>
                              <td key={uuid()}>{sample.viscosityFinal}</td>
                            </tr>
                          ))
                        }
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            ) :
              null}
          </div>
        </div>
      </Layout>
    </>
  )
}
