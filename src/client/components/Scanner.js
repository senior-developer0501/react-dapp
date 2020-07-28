import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useDispatch } from 'react-redux';

import notify, {
  NotificationsTypes,
} from '~/client/store/notifications/actions';
import styles from '~/client/styles/variables';
import translate from '~/common/services/i18n';

const Scanner = ({ onDetected, onError }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let scanner;

    const initialize = async () => {
      try {
        scanner = new BrowserMultiFormatReader();

        const devices = await scanner.getVideoInputDevices();
        if (devices.length === 0) {
          throw new Error('No devices found');
        }

        scanner.decodeFromVideoDevice(
          devices[0].deviceId,
          ref.current,
          (result, error) => {
            if (result) {
              onDetected(result.text);
            }

            if (error && !(error instanceof NotFoundException)) {
              throw error;
            }
          },
        );
      } catch (error) {
        dispatch(
          notify({
            text: translate('Scanner.notificationError', {
              error: error.message || 'Undefined error',
            }),
            type: NotificationsTypes.ERROR,
          }),
        );

        setIsError(true);

        if (onError) {
          onError(error);
        }
      }
    };

    initialize();

    return () => {
      if (scanner) {
        scanner.reset();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !isError && <ScannerStyle ref={ref} />;
};

const ScannerStyle = styled.video`
  max-width: 40rem;

  border: 1.5px solid ${styles.colors.violet};
  border-radius: 5px;
`;

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default Scanner;
