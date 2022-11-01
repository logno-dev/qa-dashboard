import Layout from '../../components/layout'
import ProductSelect from '../../components/productSelect'
import { useState, useEffect } from 'react'

export default function Entry(){
  const [ date, setDate ] = useState('')
  const [ lotCode, setLotCode ] = useState(["103022-2200", "103022-3000"])

  useEffect(()=> {
    let date = new Date()
    let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate()
    setDate(formattedDate)
  },[])

  const tempProduct = [
    {
      _id: 871098719348598,
      lot: 103022-2200,
      type: "Yogurt",
      date: "10-30-2022"
    }
  ]


  return (
    <Layout title="Entry">
      <ProductSelect 
        dir="entry"
        active="fermented"
      />
      <div className="bg-cyan-600">
        <div className="flex flex-col items-center bg-white rounded-md my-4 mx-auto min-w-[calc(100%-2rem)] p-4">
          <div className="text-4xl"><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
          <div className="text-3xl">+ Add New Lot</div>
          <div className="text-lg">
            <ul>
              <li>
                Lot: {lotCode? (<select id="lot" name="lot">
                  {lotCode.map((lot)=>(
                    <option value={lot}>{lot}</option>
                  ))}
                </select>)
                : null}
              </li>
              <li>Type: Yogurt</li>
              <li>Date: 10/30/2022</li>
              <li>Tank: 2200</li>
            </ul>
            </div>

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
                  <td>0</td>
                  <td>8:00am</td>
                  <td>8:15am</td>
                  <td>LB</td>
                  <td>140</td>
                  <td>10:15am</td>
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
                    <td>2:00am</td>
                    <td>4.87</td>
                    <td>140</td>
                    <td>82</td>
                    <td>33000</td>
                    <td>12</td>
                    <td>32920</td>
                    <td>LB</td>
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
              <tr>
                  <td>1</td>
                  <td>14.83</td>
                  <td>5.32</td>
                  <td>3.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>14.97</td>
                  <td>5.41</td>
                  <td>3.2</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>15.12</td>
                  <td>5.47</td>
                  <td>3.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>14.75</td>
                  <td>5.30</td>
                  <td>3.6</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
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
                <tr>
                  <td>2:00pm</td>
                  <td>14.32</td>
                  <td>108</td>
                  <td>5.21</td>
                  <td>6.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>2:00pm</td>
                  <td>14.32</td>
                  <td>108</td>
                  <td>5.21</td>
                  <td>6.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>2:00pm</td>
                  <td>14.32</td>
                  <td>108</td>
                  <td>5.21</td>
                  <td>6.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>2:00pm</td>
                  <td>14.32</td>
                  <td>108</td>
                  <td>5.21</td>
                  <td>6.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td>2:00pm</td>
                  <td>14.32</td>
                  <td>108</td>
                  <td>5.21</td>
                  <td>6.1</td>
                  <td>pass</td>
                  <td>LB</td>
                </tr>
                <tr>
                  <td colSpan="7">+ add new line</td>
                </tr>
              </tbody>
            </table>
          </div>

            <h3 className="text-blue-700">Finished Products</h3>
          <div className="border-blue-500 border-2 rounded-lg p-2 my-2">
            <div className="text-cyan-700">
              <ul>
                <li>Flavor: Vanilla</li>
                <li>Size: 24oz</li>
                <li>Label Version: 092822</li>
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
                    <tr>
                      <td>B</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>E</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-cyan-700">
              <ul>
                <li>Flavor: Vanilla</li>
                <li>Size: 24oz</li>
                <li>Label Version: 092822</li>
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
                    <tr>
                      <td>B</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>E</td>
                      <td>1/12/23</td>
                      <td>8:12am</td>
                      <td>72</td>
                      <td>20.02</td>
                      <td>4.22</td>
                      <td>10.2</td>
                      <td>092822</td>
                      <td>LB</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
<h4 className="text-3xl">+Add SKU</h4>

          </div>
          
        </div>
      </div>
    </Layout>
  )
}