

export default function ReportTypeEsl({ data }) {
  return (
    <>
      <h3 className="text-2xl font-semibold">Lot: <span className="text-red-700">{data.lot}</span></h3>
      <table>
        <thead>
          <tr>
            <th>
              Batch #
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
      {data.comments.map(comment => (
        <p key={comment.date}>{comment.date} - {comment.contents}</p>
      ))}
    </>
  )
}
