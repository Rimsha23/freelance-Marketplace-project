import React from 'react'

const billingPeriodDataArray = [
    {
        title : '$50/hr',
        paragraph : 'Total Invoice Rate'
    }, 
    {
        title : '$25000',
        paragraph : 'Total Invoice Rate'
    }, 
    {
        title : '$50/hr',
        paragraph : 'Total Payment Rate'
    }, 
    {
        title : '$25000',
        paragraph : 'Total Payment Amount'
    }, 
]

function BillingPeriod() {
  return (
    <div className="w-full md:h-[82px] border md:px-[25px] flex items-center md:mt-[27px] bg-white rounded-md">
          <div className="md:flex block justify-between items-center w-full md:p-0 p-2 text-sm">
            <p className="text-[14px] text-[#808080] font-medium">
            Billing Period
            </p>
            {
                billingPeriodDataArray.map((amount , index) => (
                    <div key={index}>
              <h1 className="text-center">{amount.title}</h1>
              <p className="text-[#808080] font-medium">{amount.paragraph}</p>
            </div>
                ))
            }
          </div>
        </div>
  )
}

export default BillingPeriod