import CampaignList from '@/components/CampaignList'
import React from 'react'

const Campaign = () => {
  return (
    <div className='box py-28 flex'>
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold">Campaign List</h1>
          <p className="text-sm text-gray-500 mt-2">
            Let's start contributing to the campaigns.
          </p>
        </div>
        <CampaignList />
      </div>
    </div>
  )
}

export default Campaign