import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import ReportDisplayBlock from "../../components/reportDisplayBlock";
import ReportFinishedDisplay from "../../components/reportFinishedDisplay";
// import ClientPromise from "../../lib/mongodb"




export default function Analysis() {

  const [items, setItems] = useState()
  const [category, setCategory] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  async function getData() {
    const res = await fetch(`/api/getSummary?collection=${category}&start=${startDate}&end=${endDate}`, {
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
        <div className="body-wrapper overflow-y-scroll data-entry flex-grow p-4 flex flex-col items-center">
          <form id="filter" className="flex m-4 gap-2 items-center">
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">-Select Category-</option>
              <option value="finishedProduct">Finished Product</option>
              <option value="batching">Batching</option>
            </select>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
            {(category && startDate && endDate) ? (
              <button className="button" type="button" onClick={handleFormSubmit}>Get Summary</button>
            ) :
              <button className="button-disabled" type="button" onClick={e => e.preventDefault}>Get Summary</button>
            }
          </form>
          {items ? (
            <>
              {category === "finishedProduct" ? (
                <ReportFinishedDisplay data={items} />
              ) : null}
              {category === "batching" ? (
                <ReportDisplayBlock data={items} />
              ) : null}
            </>
          ) :
            null}
        </div>
      </Layout>
    </>
  )
}
