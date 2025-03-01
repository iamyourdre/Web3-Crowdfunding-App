import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import CrowdFundingABI from '../abi/CrowdFundingV2.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const contractInstance = new web3Instance.eth.Contract(
          CrowdFundingABI.abi,
          '0x29f5419bFaC3341737F571944a5200c3eC8662bC'
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing web3 or contract:', error);
      } finally {
        setLoading(false); // Set loading to false after initialization
      }
    };

    initWeb3();
  }, []);

  return (
    <ContractContext.Provider value={{ web3, contract, loading }}>
      {children}
    </ContractContext.Provider>
  );
};