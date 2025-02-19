import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchCampaignDetails from '../hooks/useFetchCampaignDetails';
import { CampaignCard } from '@/components/CampaignCard';
import _404 from './_404';
import Loading from '@/components/Loading';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const CampaignDetails = () => {
  const { id } = useParams();
  const { loading, campaignDetails } = useFetchCampaignDetails(id-1);

  const totalContributions = (Number(campaignDetails && campaignDetails.totalContributions) / 10 ** 18);
  const goal = (Number(campaignDetails && campaignDetails.goal) / 10 ** 18);
  const percentage = (Number(totalContributions) / Number(goal)) * 100;

  console.log(campaignDetails);

  return (
    <div className='box py-28'>
      {loading ? (
        <div>
          <Loading />&nbsp; Loading
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
            <div className="lg:col-span-2 col-span-1">
              <CampaignCard campaign={campaignDetails} />
            </div>
            <div className="lg:col-span-3 col-span-1">
              <div className='mb-5'>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={2}>
                        Campaign Details
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Title</TableCell>
                      <TableCell>{campaignDetails.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Description</TableCell>
                      <TableCell>{campaignDetails.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Creator</TableCell>
                      <TableCell>
                        <Link className='underline text-blue-500' target="_blank" to={`https://sepolia.etherscan.io/address/${campaignDetails.campaignCreator}`}>
                          {campaignDetails.campaignCreator.slice(0,5)+"..."+campaignDetails.campaignCreator.slice(-4)}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ended At</TableCell>
                      <TableCell>
                        {new Date(Number(campaignDetails.endsAt) * 1000).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Collected</TableCell>
                      <TableCell>
                        {totalContributions} ETH
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Goals</TableCell>
                      <TableCell>{goal} ETH</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Progress</TableCell>
                      <TableCell>{percentage}%</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetails;