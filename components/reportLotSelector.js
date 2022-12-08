import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import uuid from 'react-uuid'


export default function ReportLotSelector({ data }) {

  const router = useRouter()
  const [valid, setValid] = useState(true)
  const [duplicate, setDuplicate] = useState(false)
  const [addingReport, setAddingReport] = useState(false)

  const [reportType, setReportType] = useState('')
  const [reportDate, setReportDate] = useState(format(new Date(), 'yyy-MM-dd'))

  useEffect(()=>{
    // setReportDate()
  },[])

  function resetErrors() {
    setValid(true)
    setDuplicate(false)
  }

  async function addReport(e) {
    e.preventDefault()
    let newReportId = reportDate + '-' + reportType
    if (!reportType || !reportDate) {
      setValid(false)
      return
    } else if (data.findIndex(e => e.reportId === newReportId) !== -1) {
      setDuplicate(true)
      return
    } else {
      let report = {
        _id: uuid(),
        reportId: newReportId,
        type: reportType,
        finalized: false,
        contents: []
      }
      setAddingReport(true)
      try {
        await fetch('/api/addReport', {
          method: 'POST',
          body: JSON.stringify(report)
        })
      } catch (e) {
        console.log(e)
      } finally {
        resetErrors()
        setReportType('')
        setAddingReport(false)
        return router.push(`/report/${newReportId}`)
      }
    }
  }



  return (
    <>
      <div className="item-selector min-w-[20rem] p-4">
        <form className="flex flex-col gap-2  border-4 border-green-700 rounded-md p-2" onChange={resetErrors}>
          <input type="date" value={reportDate} onChange={e=>setReportDate(e.target.value)} />
          <select value={reportType} onChange={e=>setReportType(e.target.value)} >
          <option value="">-Select Report Type-</option>
          <option value="batching">Batching</option>
          <option value="finishedProduct">Finished Product</option>
          </select>
          {addingReport?
            <button type="button" className="button-disabled">Adding Report...</button>
            :
            <button type="button" className="button" onClick={addReport} >Add Report</button>
          }
          {valid ? null : <p className="text-red-700">*Please fill out all fields</p>}
          {duplicate ? <p className="text-red-700">*Report already exists</p> : null}
        </form>
        <ul className="p-2">
          {data.map((item) => (
            <li key={item._id} className="p-2"><Link href={`/report/${item.reportId}`} className={item.finalized ? "bg-gray-200 p-2 rounded-md hover:bg-gray-300" : "bg-blue-200 p-2 rounded-md hover:bg-blue-300"} >{item.reportId}</Link></li>
          ))}
        </ul>
      </div>
    </>
  )
}
