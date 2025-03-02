import React from 'react'

function TextView1({title, value}) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="font-medium text-gray-800">{value}</p>
          </div>
  )
}

export default TextView1