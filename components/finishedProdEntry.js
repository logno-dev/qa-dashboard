import { useState, useEffect } from 'react'
// import uuid from 'react-uuid'
import format from 'date-fns/format'

export default function FinishedProdEntry({ product, handleChange }) {
  const [childItem, setChildItem] = useState(product)
  const [firstLoad, setFirstLoad] = useState(true)
  const [newComment, setNewComment] = useState()

  function localChange(field, targetValue) {
    setChildItem({
      ...childItem, [field]: targetValue
    }
    )
  }

  function localChangeArray(category, index, field, targetValue) {
    let tempArrayCopy = [...childItem[category]].map((item, i) => {
      if (i === index) {
        let newItem = { ...item, [field]: targetValue }
        return newItem
      } else {
        return item
      }
    })
    setChildItem({
      ...childItem, [category]: tempArrayCopy
    })
  }

  function addSample(e) {
    e.preventDefault()
    let emptysample = {
      BME: "",
      enjoyBy: "",
      time: "",
      temp: "",
      solids: "",
      pH: "",
      brix: "",
      viscosity: "",
      label: "",
      passFail: "",
      signOff: "",
    }
    let newsampleArray = [...childItem.samples]
    newsampleArray.push(emptysample)
    // console.log(newsampleArray)
    setChildItem({
      ...childItem, samples: newsampleArray
    })
  }


  function addComment() {
    let commentObject = {
      date: format(new Date(), 'MM-dd-yyy h:mmaa'),
      contents: newComment
    }

    let newCommentArray = [...childItem.comments]
    newCommentArray.push(commentObject)

    setChildItem({
      ...childItem, comments: newCommentArray
    })
    setNewComment("")
  }

  useEffect(() => {
    handleChange(childItem, firstLoad)
    setFirstLoad(false)
  }, [childItem])

  useEffect(() => {
    if (!childItem || JSON.stringify(product) !== JSON.stringify(childItem)) {
      setFirstLoad(true)
    }
    if (JSON.stringify(product) !== JSON.stringify(childItem) && product.lot === childItem.lot) {
      setFirstLoad(false)
    }
    setChildItem(product)
    setNewComment("")
  }, [product])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> ID: <span className="text-orange-800">{childItem.id}</span></h2>
      </div>
      <div className="text-2xl font-bold">
        <h2>Enjoy By date:<input type="date" value={childItem.enjoyBy} onChange={(e) => localChange('enjoyBy', e.target.value)} /></h2>
        <h2>Reference Label Code:<input type="text" size={6} value={childItem.label} onChange={(e) => localChange('label', e.target.value)} /></h2>
      </div>

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
              Viscosity
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
          {childItem.samples.map((sample, i) => (
            <tr key={i}>
              <td>{childItem.finalized ? sample.BME : (<select value={sample.BME} onChange={(e) => localChangeArray('samples', i, 'BME', e.target.value)}>
                <option value="">--</option>
                <option value="B">B</option>
                <option value="M">M</option>
                <option value="E">E</option>
                <option value="retest">Retest</option>
              </select>)}</td>
              <td>{childItem.finalized ? sample.enjoyBy : <input type="date" value={sample.enjoyBy} onChange={(e) => localChangeArray('samples', i, 'enjoyBy', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.label : <input type="text" size={6} value={sample.label} onChange={(e) => localChangeArray('samples', i, 'label', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.time : <input type="time" value={sample.time} onChange={(e) => localChangeArray('samples', i, 'time', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.temp : <input type="text" size={4} value={sample.temp} onChange={(e) => localChangeArray('samples', i, 'temp', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.solids : <input type="text" size={4} value={sample.solids} onChange={(e) => localChangeArray('samples', i, 'solids', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.pH : <input type="text" size={4} value={sample.pH} onChange={(e) => localChangeArray('samples', i, 'pH', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.brix : <input type="text" size={4} value={sample.brix} onChange={(e) => localChangeArray('samples', i, 'brix', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.viscosity : <input type="text" size={6} value={sample.viscosity} onChange={(e) => localChangeArray('samples', i, 'viscosity', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? sample.passFail : (<select value={sample.passFail} onChange={(e) => localChangeArray('samples', i, 'passFail', e.target.value)}>
                <option value="">---</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>)}</td>
              <td>{childItem.finalized ? sample.signOff : <input type="text" size={3} value={sample.signOff} onChange={(e) => localChangeArray('samples', i, 'signOff', e.target.value)}></input>}</td>
            </tr>
          ))}
          {childItem.finalized ? null : (
            <tr>
              <td colSpan={11}>
                <button type="button" onClick={addSample}>+Add new sample</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ul>
        {childItem.comments.map((comment) => (
          <li key={comment.date}>{comment.date} - {comment.contents}</li>
        ))}
      </ul>
      {childItem.finalized ? null : (
        <div className="flex justify-center items-center">
          <textarea rows={4} cols={90} placeholder="comments..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="button" className="button m-2" onClick={addComment} >Add<br />Comment</button>
        </div>
      )}
    </>
  )
}
