


export default function ReportTypeYogurt({ data }) {
  return (
    <>
      <h2 className="text-2xl font-semibold">Lot: <span className="text-red-700">{data.lot}</span> &nbsp; Mass Type: <span className="text-red-700">{data.productType}</span></h2>
      <h2 className="text-xl">UHT Ops</h2>
      <table>
        <thead>
          <tr>
            <th>
              Ferm Tank Start Weight(lbs)
            </th>
            <th>
              Agitation Start
            </th>
            <th>
              Innoc Time
            </th>
            <th>
              Innoc By
            </th>
            <th>
              Flash Psi
            </th>
            <th>
              Agitation End
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.ferm.tankStart}</td>
            <td>{data.ferm.agStart}</td>
            <td>{data.ferm.innocTime}</td>
            <td>{data.ferm.innocBy}</td>
            <td>{data.ferm.flash}</td>
            <td>{data.ferm.agEnd}</td>
          </tr>
        </tbody>
      </table>



      <h3 className="text-xl">Raw Batching</h3>
      <table>
        <thead>
          <tr>
            <th>
              Batch #
            </th>
            <th>
              Solids(%)
            </th>
            <th>
              pH
            </th>
            <th>
              Brix
            </th>
            <th>
              Pass/Fail
            </th>
            <th>
              Sign Off
            </th>
          </tr>
        </thead>
        <tbody>
          {data.batches.map((batch, i) => (
            <tr key={i}>
              <td>{batch.batchNum}</td>
              <td>{batch.solids}</td>
              <td>{batch.pH}</td>
              <td>{batch.brix}</td>
              <td>{batch.passFail}</td>
              <td>{batch.signOff}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl">Fermentation Checks</h3>
      <table>
        <thead>
          <tr>
            <th>
              Time
            </th>
            <th>
              Solids(%)
            </th>
            <th>
              pH
            </th>
            <th>
              Brix
            </th>
            <th>
              Temp (&deg;F)
            </th>
            <th>
              Pass/Fail
            </th>
            <th>
              Sign Off
            </th>
          </tr>
        </thead>
        <tbody>
          {data.fermQA.map((check, i) => (
            <tr key={i}>
              <td>{check.time}</td>
              <td>{check.solids}</td>
              <td>{check.pH}</td>
              <td>{check.brix}</td>
              <td>{check.temp}</td>
              <td>{check.passFail}</td>
              <td>{check.signOff}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.comments.map(comment => (
        <p key={comment.date}>{comment.date} - {comment.contents}</p>
      ))}
    </>

  )
}
