import AdminContract from 'culturestake-contracts/build/contracts/Admin.json';
import VoteContract from 'culturestake-contracts/build/contracts/Vote.json';

import web3 from '~/common/services/web3';

function getContract(abi, address) {
  return new web3.eth.Contract(abi, address);
}

export function getAdminContract(address) {
  return getContract(AdminContract.abi, address);
}

export function getVoteContract(address) {
  return getContract(VoteContract.abi, address);
}
