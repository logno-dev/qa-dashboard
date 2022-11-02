import uuid from "react-uuid";

export default function FermentedProductData({ product }) {
  return (
    <>
      <h3 className="text-yellow-700">UHT Ops</h3>
      <div className="border-yellow-500 border-2 rounded-lg p-2 my-2">
        <table>
          <thead>
            <tr>
              <th>Tank Start Weight</th>
              <th>Agitation Start</th>
              <th>Innoculation</th>
              <th>Innoc By</th>
              <th>Flash PSI</th>
              <th>Agitation End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.UHT.tankStart}</td>
              <td>{product.UHT.agStart}</td>
              <td>{product.UHT.innoc}</td>
              <td>{product.UHT.innocBy}</td>
              <td>{product.UHT.flashPSI}</td>
              <td>{product.UHT.agEnd}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-orange-700">QA Transfer</h3>
      <div className="border-orange-500 border-2 rounded-lg p-2 my-2">
        <table>
          <thead>
            <tr>
              <th>Break Time</th>
              <th>pH</th>
              <th>Speed</th>
              <th>Temp(&deg;F)</th>
              <th>White Mass Weight</th>
              <th>Hold Start Weight</th>
              <th>Hold End Weight</th>
              <th>Transfer by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.transfer.breakTime}</td>
              <td>{product.transfer.pH}</td>
              <td>{product.transfer.speed}</td>
              <td>{product.transfer.temp}</td>
              <td>{product.transfer.whiteMassWeight}</td>
              <td>{product.transfer.holdWeightStart}</td>
              <td>{product.transfer.holdWeightEnd}</td>
              <td>{product.transfer.transferBy}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-red-700">Batching</h3>
      <div className="border-red-500 border-2 rounded-lg p-2 my-2">
        <table>
          <thead>
            <tr>
              <th>Batch #</th>
              <th>Solids</th>
              <th>pH</th>
              <th>Brix</th>
              <th>Sensory(Pass/Fail)</th>
              <th>Initial</th>
            </tr>
          </thead>
          <tbody>
            {product.batching.map((batch) => (
              <tr key={uuid()}>
                <td>{batch.batchNum}</td>
                <td>{batch.solids}</td>
                <td>{batch.pH}</td>
                <td>{batch.brix}</td>
                <td>{batch.sensory}</td>
                <td>{batch.initial}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="6">+ add new batch</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-gray-700">Fermentation</h3>
      <div className="border-gray-500 border-2 rounded-lg p-2 my-2">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Solids</th>
              <th>Temp(&deg;F)</th>
              <th>pH</th>
              <th>Brix</th>
              <th>Sensory(Pass/Fail)</th>
              <th>Initial</th>
            </tr>
          </thead>
          <tbody>
            {product.fermentation.map((pull) => (
              <tr key={uuid()}>
                <td>{pull.time}</td>
                <td>{pull.solids}</td>
                <td>{pull.temp}</td>
                <td>{pull.pH}</td>
                <td>{pull.brix}</td>
                <td>{pull.sensory}</td>
                <td>{pull.initial}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="7">+ add new line</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-blue-700">Finished Products</h3>
      <div className="border-blue-500 border-2 rounded-lg p-2 my-2">
        {product.finishedProduct.map((fp) => (
          <div className="text-cyan-700" key={uuid()}>
            <ul>
              <li>Flavor: {fp.flavor}</li>
              <li>Size: {fp.size}</li>
              <li>Label Version: {fp.labelVersion}</li>
            </ul>
            <div className="border-cyan-500 border-2 rounded-lg p-2 my-2">
              <table>
                <thead>
                  <tr>
                    <th>BME</th>
                    <th>BB Date</th>
                    <th>Time</th>
                    <th>Temp(&deg;F)</th>
                    <th>Solids</th>
                    <th>pH</th>
                    <th>Brix</th>
                    <th>Label Version</th>
                    <th>Initial</th>
                    <th>Viscosity</th>
                    <th>Review</th>
                    <th>Shelf Life Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {fp.BME.map((bme)=>(
                    <tr key={uuid()}>
                      <td>{bme.sample}</td>
                      <td>{bme.bbDate}</td>
                      <td>{bme.time}</td>
                      <td>{bme.temp}</td>
                      <td>{bme.solids}</td>
                      <td>{bme.pH}</td>
                      <td>{bme.brix}</td>
                      <td>{bme.labelVersion}</td>
                      <td>{bme.initial}</td>
                      <td>{bme.viscosity}</td>
                      <td>{bme.review}</td>
                      <td>{bme.shelfLife}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <h4 className="text-3xl">+Add SKU</h4>
      </div>
    </>
  );
}
