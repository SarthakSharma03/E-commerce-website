const SectionTitle = ({ eyebrow, title, action }) => {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-2">
            <span className="h-6 w-1 rounded bg-red-500" />
            <span className="text-sm font-medium text-red-500">{eyebrow}</span>
          </div>
        )}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export default SectionTitle
