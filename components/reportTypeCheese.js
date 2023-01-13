

export default function ReportTypeCheese({ data }) {
  return (
    <>
      <h2 className="text-2xl font-semibold">Lot: <span className="text-red-700">{data.lot}</span></h2>
      <table>
        <thead>
          <tr>
            <th>
              Batch #
            </th>
            <th>
              Time
            </th>
            <th>
              Finished pH
            </th>
            <th>
              Finished Moisture %
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
              <td>{batch.time}</td>
              <td>{batch.finishedpH}</td>
              <td>{batch.finishedMoisture}</td>
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
