

export default function InfoWidget({ children }) {
  return (
    <>
      <div className="body-wrapper overflow-y-scroll flex flex-col items-center p-4 max-w-sm">
        {children}
      </div>
    </>
  )
}
