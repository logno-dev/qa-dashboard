import clientPromise from "../../../lib/mongodb";
import ReportDisplayBlock from "../../../components/reportDisplayBlock";
import ReportFinishedDiplay from "../../../components/reportFinishedDisplay";
import { PrinterIcon } from "@heroicons/react/24/solid/"
import Image from "next/image";
import logo from "../../../public/fp_logo.svg"


export async function getServerSideProps(context) {
  const id = context.params.id

  try {
    const client = await clientPromise;
    const db = client.db("products");

    let query = { reportId: id }

    const report = await db.collection("report").findOne(query);

    return {
      props: {
        report: JSON.parse(JSON.stringify(report)),
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: { data: "error loading data" },
    };
  }
}

export default function RenderedReport({ report }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-4xl leading-3 ">
          {report.finalized ? (
            <>
              <div onClick={() => window.print()} className="w-12 p-2 mx-8 bg-yellow-600 text-white rounded-b-md fixed top-0 right-4 shadow-md cursor-pointer hover:scale-110 print:hidden" ><PrinterIcon /></div>
              <div className="grid grid-cols-auto grid-rows-4 border-2 border-gray-800 ">
                <div className="col-start-1 row-start-1 col-span-1 row-span-4 flex items-center justify-center p-1"><Image src={logo} width={90} height={40} /></div>
                <div className="text-lg text-center border-2 border-gray-800 col-start-2 col-span-1 row-start-1 row-span-2 w-96 py-1 px-4">Title: <span className="text-red-800">Lab Results Report</span> Type: <span className="text-red-800">{report.type}</span><br />Report:<span className="text-red-800 font-semibold">{report.reportId}</span></div>
                <div className="text-center leading-4 border-2 border-gray-800 col-start-2 col-span-1 row-start-3 row-span-2 w-96 py-1 px-4">Proprietary and Confidential Business Information<br />Internal Forager Project, Indio Use Only</div>
                <div className="text-sm col-start-3 col-span-1 border-2 border-gray-800 p-1">Effective date:##/##/####</div>
                <div className="text-sm col-start-3 col-span-1 border-2 border-gray-800 p-1">Document #: QA-FORM-###</div>
                <div className="text-sm col-start-3 col-span-1 border-2 border-gray-800 p-1">SQF Reference Clause: 2.5.4.1</div>
                <div className="text-sm col-start-3 col-span-1 border-2 border-gray-800 p-1">Revision: ##/##/#### Revision #: #</div>
              </div>
              {report.type === 'batching' ? (
                <ReportDisplayBlock data={report.contents} />
              ) : (
                <ReportFinishedDiplay data={report.contents} />
              )}
              <div className="py-4 text-center">Document Review Signature:________________________________________ Date: _______________</div>
            </>
          ) :
            <p className="text-xl p-8">This report has not been finalized</p>}
        </div>
      </div>
    </>
  )
}

