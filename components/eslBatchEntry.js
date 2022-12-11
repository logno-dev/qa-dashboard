import { useState, useEffect } from 'react'
import format from 'date-fns/format'

export default function EslBatchEntry({ product, handleChange }) {
  const [childItem, setChildItem] = useState(product)
  const [firstLoad, setFirstLoad] = useState(true)
  const [newComment, setNewComment] = useState()

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

  function addBatch(e) {
    e.preventDefault()
    let emptyBatch = {
      batchNum: (childItem.batches.length + 1),
      solids: "",
      pH: "",
      brix: "",
      passFail: "",
      signOff: "",
    }
    let newBatchArray = [...childItem.batches]
    newBatchArray.push(emptyBatch)
    // console.log(newBatchArray)
    setChildItem({
      ...childItem, batches: newBatchArray
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
  }

  useEffect(() => {
    // console.log(saveCompareItem)
  }, [product])

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
  }, [product])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> Lot: <span className="text-orange-800">{childItem.lot}</span></h2>
      </div>
      <h3 className="text-2xl">Batch Data</h3>
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
          {childItem.batches.map((batch, i) => (
            <tr key={i}>
              <td>{batch.batchNum}</td>
              <td>{childItem.finalized ? batch.solids : <input type="text" value={batch.solids} onChange={(e) => localChangeArray('batches', i, 'solids', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.pH : <input type="text" value={batch.pH} onChange={(e) => localChangeArray('batches', i, 'pH', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.brix : <input type="text" value={batch.brix} onChange={(e) => localChangeArray('batches', i, 'brix', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.passFail : (<select value={batch.passFail} onChange={(e) => localChangeArray('batches', i, 'passFail', e.target.value)}>
                <option value="">---</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>)}</td>
              <td>{childItem.finalized ? batch.signOff : <input type="text" value={batch.signOff} onChange={(e) => localChangeArray('batches', i, 'signOff', e.target.value)}></input>}</td>
            </tr>
          ))}
          {childItem.finalized ? null : (
            <tr>
              <td colSpan={6}>
                <button type="button" onClick={addBatch}>+Add new batch</button>
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
        <div className="flex flex-col items-center">
          <textarea rows={4} cols={90} placeholder="comments..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="button" className="button m-2" onClick={addComment} >Add Comment</button>
        </div>
      )}

    </>
  )
}
