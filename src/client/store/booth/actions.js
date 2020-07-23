import ActionTypes from '~/client/store/booth/types';
import { getAccount, removePrivateKey } from '~/client/services/wallet';
import { getVotingBooth } from '~/common/services/contracts/booths';

export function initializeBooth() {
  const { address } = getAccount();

  return {
    type: ActionTypes.BOOTH_INITIALIZE,
    meta: {
      address,
    },
  };
}

export function checkBoothStatus() {
  return async (dispatch, getStore) => {
    const { booth } = getStore();

    if (!booth.address) {
      return;
    }

    const {
      festivalAddress,
      isDeactivated,
      isInitialized,
    } = await getVotingBooth(booth.address);

    if (
      booth.isDeactivated !== isDeactivated ||
      booth.isInitialized !== isInitialized
    ) {
      dispatch({
        type: ActionTypes.BOOTH_UPDATE_STATUS,
        meta: {
          festivalAddress,
          isDeactivated,
          isInitialized,
        },
      });
    }
  };
}

export function resetBooth() {
  removePrivateKey();

  return {
    type: ActionTypes.BOOTH_RESET,
  };
}
