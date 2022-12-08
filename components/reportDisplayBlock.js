import ReportTypeYogurt from "./reportTypeYogurt"
import ReportTypeEsl from "./reportTypeEsl"
import ReportTypeCheese from "./reportTypeCheese"


export default function ReportDisplayBlock({data}) {


  return (
  <ul>
    {data.map(lot=> (
      <li key={lot._id} className="border-t-slate-700 border-t-4 p-1">
      {lot.fermented ? 
      <ReportTypeYogurt data={lot} />
      : null}
      {lot.productType === 'esl' ? 
        <ReportTypeEsl data={lot} />
        : null}
      {lot. productType === 'cheese' ? 
        <ReportTypeCheese data={lot} />
        : null}
      </li>
    ))}
    </ul>
  )
}
