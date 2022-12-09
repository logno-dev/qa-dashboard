import clientPromise from "../../../lib/mongodb";
import ReportDisplayBlock from "../../../components/reportDisplayBlock";
import { PrinterIcon } from "@heroicons/react/24/solid/"


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
              <div onClick={() => window.print()} className="w-12 p-2 mx-8 bg-yellow-600 text-white rounded-b-md fixed top-0 right-14 shadow-md cursor-pointer print:hidden" ><PrinterIcon /></div>
              <ReportDisplayBlock data={report.contents} />
            </>
          ) :
            <p className="text-xl p-8">This report has not been finalized</p>}
        </div>
      </div>
    </>
  )
}

