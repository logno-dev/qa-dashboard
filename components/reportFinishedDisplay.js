

export default function ReportFinishedDiplay({ data }) {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <h3 className="text-2xl font-semibold">Lot: <span className="text-red-700">{item.id}</span></h3>
          <table>
            <thead>
              <tr>
                <th>
                  BME
                </th>
                <th>
                  Enjoy By
                </th>
                <th>
                  Label Code
                </th>
                <th>
                  Time
                </th>
                <th>
                  Temp&deg;F
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
                  Viscosity Day 1
                </th>
                <th>
                  Viscosity Final
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
              {item.samples.map((sample, i) => (
                <tr key={i}>
                  <td>{sample.BME}</td>
                  <td>{sample.enjoyBy}</td>
                  <td>{sample.label}</td>
                  <td>{sample.time}</td>
                  <td>{sample.temp}</td>
                  <td>{sample.solids}</td>
                  <td>{sample.pH}</td>
                  <td>{sample.brix}</td>
                  <td>{sample.ViscosityDayOne}</td>
                  <td>{sample.ViscosityFinal}</td>
                  <td>{sample.passFail}</td>
                  <td>{sample.signOff}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {item.comments.map(comment => (
            <p key={comment.date}>{comment.date} - {comment.contents}</p>
          ))}
        </li>
      ))}
    </ul>
  )
}
