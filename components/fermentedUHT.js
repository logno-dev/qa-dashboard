import { useState, useEffect } from "react";

export default function FermentedUHT({ product, handleSaveData }) {
  const [edit, toggleEdit] = useState(true);
  const [uhtData, setUhtData] = useState({ ...product });

  useEffect(()=>{
    setUhtData({...product})
    if(!product){
      toggleEdit(true)
    }
  },[product])

  function handleOnChange(e, item) {
    setUhtData({ ...uhtData, [item]: e.target.value });
  }

  function onSave() {
    toggleEdit(false)
    handleSaveData("UHT", uhtData)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Start Weight</th>
            <th>Agitation Start</th>
            <th>Innoc Time</th>
            <th>Innoc By</th>
            <th>Flash PSI</th>
            <th>Agitation End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!edit ? (
            <tr>
              <td>{uhtData.startWeight}</td>
              <td>{uhtData.agStart}</td>
              <td>{uhtData.innocTime}</td>
              <td>{uhtData.innocBy}</td>
              <td>{uhtData.flash}</td>
              <td>{uhtData.agEnd}</td>
              <td>
                <button type="button" onClick={() => toggleEdit(true)}>
                  Edit
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <input
                  type="number"
                  value={uhtData.startWeight}
                  onChange={(e) => handleOnChange(e, "startWeight")}
                ></input>
              </td>
              <td>
                <input type="time" value={uhtData.agStart}
                  onChange={(e) => handleOnChange(e, "agStart")}></input>
              </td>
              <td>
                <input type="time" value={uhtData.innocTime}
                  onChange={(e) => handleOnChange(e, "innocTime")}></input>
              </td>
              <td>
                <input type="text" maxLength={2} value={uhtData.innocBy}
                  onChange={(e) => handleOnChange(e, "innocBy")}></input>
              </td>
              <td>
                <input type="number" value={uhtData.flash}
                  onChange={(e) => handleOnChange(e, "flash")}></input>
              </td>
              <td>
                <input type="time" value={uhtData.agEnd}
                  onChange={(e) => handleOnChange(e, "agEnd")}></input>
              </td>
              <td>
                <button type="button" onClick={onSave}>
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
