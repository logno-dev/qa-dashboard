import Layout from '../../components/layout'
import ReportLotSelector from '../../components/reportLotSelector'
import ReportDisplayBlock from '../../components/reportDisplayBlock'
import ReportFinishedDiplay from '../../components/reportFinishedDisplay'
import InfoWidget from '../../components/infoWidget'
import SampleWidget from '../../components/widgets/sampleWidget'
import clientPromise from '../../lib/mongodb'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
// import { format } from 'date-fns'
import uuid from 'react-uuid'

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const reports = await db.collection("report").find({}).sort({ dateAdded: -1 }).limit(50).toArray();
    const lots = await db.collection("batching").find({ finalized: false }).sort({ dateAdded: 1 }).toArray();
    const finishedProducts = await db.collection("finishedProduct").find({ finalized: false }).sort({ dateAdded: 1 }).toArray();

    return {
      props: {
        reports: JSON.parse(JSON.stringify(reports)),
        lots: JSON.parse(JSON.stringify(lots)),
        finishedProducts: JSON.parse(JSON.stringify(finishedProducts))
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: { data: "error loading data" },
    };
  }
}


export default function GeneratedReport({ reports, lots, finishedProducts }) {

  const router = useRouter()
  const { id } = router.query
  const [selectedReport, setSelectedReport] = useState(reports[reports.findIndex(e => e.reportId === id)])
  const [pendingItems, setPendingItems] = useState([])
  const [queuedItems, setQueuedItems] = useState(new Array)
  const [confirmFinal, setConfirmFinal] = useState(false)
  const [finalizing, setFinalizing] = useState(false)

  useEffect(() => {
    if (selectedReport.type === 'batching') {
      setPendingItems(lots.map(e => e.lot))
    } else if (selectedReport.type === 'finishedProduct') {
      setPendingItems(finishedProducts.map(e => e.id))
    }
  }, [selectedReport])

  useEffect(() => {
    setQueuedItems([])
    setSelectedReport(reports[reports.findIndex(e => e.reportId === id)])
  }, [id])


  function addLotToReport(e, item) {
    e.preventDefault()
    if (selectedReport.type === 'batching') {
      setQueuedItems([...queuedItems, lots[lots.findIndex(e => e.lot === item)]])
      setPendingItems(pendingItems.filter(e => e !== item))
    } else if (selectedReport.type === 'finishedProduct') {
      setQueuedItems([...queuedItems, finishedProducts[finishedProducts.findIndex(e => e.id === item)]])
      setPendingItems(pendingItems.filter(e => e !== item))
    }
  }

  function openPopup() {
    let link = 'rendered/' + selectedReport.reportId
    window.open(link, "popup", 'width=900, height=980')
  }

  const FinalizeButton = () => {
    return (
      <>
        {finalizing ? (
          <p className="text-2xl text-gray-600 text-center">Finalizing</p>
        )
          :
          (
            <>
              {confirmFinal ? (
                <>
                  <p className="text-xl font-semibold text-red-800">Are you sure you would like to finalize this report?</p>
                  <p className="text-xl"> This action cannot be undone and items included in this report will not be able to be changed in the future.</p>
                  <div className="flex">
                    <button type="button" className="button m-2" onClick={updateReport}>Confirm</button><button type="button" onClick={() => setConfirmFinal(false)} className="button-red m-2">Cancel</button>
                  </div>
                </>
              )
                : <button type="button" onClick={() => setConfirmFinal(true)} className="button w-96 m-2">Finalize Report</button>}
            </>
          )}
      </>
    )
  }

  async function updateReport() {
    let updatedReport = { ...selectedReport, contents: queuedItems, finalized: true }
    try {
      await fetch('/api/updateReport', {
        method: 'PUT',
        body: JSON.stringify(updatedReport)
      }
      )
      setConfirmFinal(false)
      setFinalizing(true)
    } catch (e) {
      console.log(e)
      console.log('saving...')
    } finally {
      setFinalizing(false)
      setQueuedItems([])
      setSelectedReport(updatedReport)
    }
  }

  // function handleSave(e, lot) {
  //   e.preventDefault()
  //   updateItem(lot)
  // }

  return (
    <>
      <Layout title="Batching">
        <div className="two-column flex">
          <ReportLotSelector data={reports} />
          <div className="data-entry flex flex-col items-center flex-grow p-4">
            {(id && !selectedReport) ? (
              <h2 className="text-2xl">Report not found</h2>
            )
              :
              (<>
                <h2 className="text-3xl text-blue-700 font-bold p-2">Report:<span className="text-red-700">{selectedReport.reportId}</span></h2>
                {selectedReport.finalized ? (
                  <>
                    {/* <Link href={'rendered/' + selectedReport.reportId} target="_blank" className="button m-4">Print Report</Link> */}
                    <a href={'rendered/' + selectedReport.reportId} target="popup" className="button m-4" onClick={openPopup} >Print Report</a>
                    {selectedReport.type === 'batching' ? (
                      <ReportDisplayBlock data={selectedReport.contents} />
                    ) : (
                      <ReportFinishedDiplay data={selectedReport.contents} />
                    )}
                  </>
                )
                  :
                  (
                    <>
                      {pendingItems.length === 0 ? <p className="text-lg text-gray-500">No items available for this report</p> : <p className="text-lg">Select items to add to the report:</p>}
                      <ul className="flex flex-wrap gap-2 p-4">
                        {pendingItems.map(item => {
                          return (
                            <li key={uuid()}><button type="button" onClick={(e) => addLotToReport(e, item)} className="bg-blue-200 p-2 rounded-md hover:bg-blue-300">{item}</button></li>
                          )
                        })
                        }
                      </ul>
                      {(queuedItems.length > 0) ?
                        (
                          <>
                            <FinalizeButton />
                            {selectedReport.type === 'batching' ? (
                              <ReportDisplayBlock data={queuedItems} />
                            ) : (
                              <ReportFinishedDiplay data={queuedItems} />
                            )}
                          </>
                        ) :
                        (<h2 className="text-3xl">Add batches to the report</h2>)
                      }
                    </>
                  )
                }
              </>)}
          </div>
          <InfoWidget>
            <SampleWidget />
          </InfoWidget>
        </div>
      </Layout>
    </>
  )
}
