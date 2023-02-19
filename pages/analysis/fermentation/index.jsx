import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import AnalNav from "../../../components/analysis/nav";
import Layout from "../../../components/layout";
// import ClientPromise from "../../lib/mongodb"




export default function Analysis() {

  const [items, setItems] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  async function getData() {
    const res = await fetch(`/api/getFermData?start=${startDate}&end=${endDate}`, {
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
            <h2>Fermentation Spreadsheet</h2>
            <form id="filter" className="flex m-4 gap-2 items-center">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
              {(startDate && endDate) ? (
                <button className="button" type="button" onClick={handleFormSubmit}>Get Data</button>
              ) :
                <button className="button-disabled" type="button" onClick={e => e.preventDefault}>Get Data</button>
              }
            </form>
            {items ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Date
                      </th>
                      <th>
                        Tank
                      </th>
                      <th>
                        Mass Type
                      </th>
                      <th>
                        Ag Start
                      </th>
                      <th>
                        Innoc Time
                      </th>
                      <th>
                        Ag End
                      </th>
                      <th>
                        Transfer Start
                      </th>
                      <th>
                        Transfer End
                      </th>
                      <th>
                        pH
                      </th>
                      <th>
                        gpm
                      </th>
                      <th>
                        temp
                      </th>
                      <th>
                        Mass Start lbs
                      </th>
                      <th>
                        Empty Hold lbs
                      </th>
                      <th>
                        Mass End lbs
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {items.map(item => (
                      <tr key={item.id}>
                        <td key={uuid()}>{format(new Date(item.dateAdded), "yyyy-MM-dd")}</td>
                        <td key={uuid()}>{item.tankNum}</td>
                        <td key={uuid()}>{item.productType}</td>
                        <td key={uuid()}>{item.ferm.agStart}</td>
                        <td key={uuid()}>{item.ferm.innocTime}</td>
                        <td key={uuid()}>{item.ferm.agEnd}</td>
                        <td key={uuid()}>{item.transfer.breakTimeStart}</td>
                        <td key={uuid()}>{item.transfer.breakTimeEnd}</td>
                        <td key={uuid()}>{item.transfer.pH}</td>
                        <td key={uuid()}>{item.transfer.speed}</td>
                        <td key={uuid()}>{item.transfer.temp}</td>
                        <td key={uuid()}>{item.transfer.whiteMassWeight}</td>
                        <td key={uuid()}>{item.transfer.holdTankWeightStart}</td>
                        <td key={uuid()}>{item.transfer.holdTankWeightEnd}</td>
                      </tr>
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
