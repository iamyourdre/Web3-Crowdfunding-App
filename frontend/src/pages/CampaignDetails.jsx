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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button';
import { DollarSign, Trash2 } from 'lucide-react';
import useWallet from '@/hooks/useWallet';
import useDeleteCampaign from '@/hooks/useDeleteCampaign';
import { use } from 'react';
import useClaim from '@/hooks/useClaim';

const CampaignDetails = () => {
  const { id } = useParams();
  const {wallet} = useWallet();
  const {deleteCampaign, loading: loadingDelete} = useDeleteCampaign();
  const { claim, loading: loadingClaim } = useClaim();
  const { loading, campaignDetails } = useFetchCampaignDetails(id-1);
  const [status, setStatus] = useState("Active");

  const totalContributions = (Number(campaignDetails && campaignDetails.totalContributions) / 10 ** 18);
  const goal = (Number(campaignDetails && campaignDetails.goal) / 10 ** 18);
  const percentage = (Number(totalContributions) / Number(goal)) * 100;
  
  useEffect(() => {
    if(campaignDetails && campaignDetails.isSuccessful) {
      setStatus("Successful");
    } else if (campaignDetails && campaignDetails.endsAt * 1000 < new Date().getTime()) {
      setStatus("Failed");
    }
  }, []);

  if(!loading && !campaignDetails) {
    return <_404 />
  }

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
                      <TableCell className="font-medium">Status</TableCell>
                      <TableCell>{status}</TableCell>
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
                {/* Claim features can only be triggered by contract owner */}
                {wallet && wallet === '0x0Fecc4DD1fC3E9708Ed94FE6330d5d5D1e730a26' &&  (
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {loadingClaim ? (
                          <Button className='mt-4 bg-teal-400' disabled>
                            <Loading /> Claiming...
                          </Button>
                        ) : (
                          <Button className='mt-4 bg-teal-400'>
                            <DollarSign />
                            Claim Funds
                          </Button>
                        )}
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Claim Funds</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          Are you sure you want to claim the funds for this campaign? <b>This action cannot be undone, please be careful.</b>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => claim(campaignDetails.id)}>
                            Claim
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetails;