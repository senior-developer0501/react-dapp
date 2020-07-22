import React, { Fragment, useState, useEffect } from 'react';
import translate from '~/common/services/i18n';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import apiRequest from '~/client/services/api';
import ButtonIcon from '~/client/components/ButtonIcon';
import FooterAdmin from '~/client/components/FooterAdmin';
import HeaderAdmin from '~/client/components/HeaderAdmin';
import DangerZone from '~/client/components/DangerZone';
import ButtonSubmit from '~/client/components/ButtonSubmit';
import FormQuestions from '~/client/components/FormQuestions';
import ViewAdmin from '~/client/components/ViewAdmin';
import ContractsQuestions from '~/client/components/ContractsQuestions';
import { useEditForm } from '~/client/hooks/forms';
import notify, {
  NotificationsTypes,
} from '~/client/store/notifications/actions';

const AdminQuestionsEdit = () => {
  const returnUrl = '/admin/questions';
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isFestivalLoading, setIsFestivalLoading] = useState(true);
  const [festival, setFestival] = useState({});

  const { ButtonDelete, Form, isResourceLoading, resource } = useEditForm({
    fields: ['chainId', 'festivalId', 'title'],
    resourcePath: ['questions', id],
    returnUrl,
    onNotFound: () => {
      dispatch(
        notify({
          text: translate('AdminFestivalsEdit.errorNotFound'),
        }),
      );
    },
    onDeleteSuccess: ({ title }) => {
      dispatch(
        notify({
          text: translate('AdminFestivalsEdit.notificationDestroySuccess', {
            title,
          }),
        }),
      );
    },
    onUpdateSuccess: ({ title }) => {
      dispatch(
        notify({
          text: translate('AdminFestivalsEdit.notificationSuccess', {
            title,
          }),
        }),
      );
    },
    onUpdateError: () => {
      dispatch(
        notify({
          text: translate('default.errorMessage'),
          type: NotificationsTypes.ERROR,
        }),
      );
    },
  });

  useEffect(() => {
    const getFestival = async () => {
      const state = await await apiRequest({
        path: ['festivals', id],
      });
      setFestival(state);
      setIsFestivalLoading(false);
    };
    getFestival();
  }, [id, setFestival, setIsFestivalLoading]);

  return (
    <Fragment>
      <HeaderAdmin>{translate('AdminQuestionsNew.title')}</HeaderAdmin>

      <ViewAdmin>
        <Form>
          <FormQuestions />

          <DangerZone>
            <ButtonDelete />
          </DangerZone>

          {!isResourceLoading &&
            resource.chainId &&
            !isFestivalLoading &&
            festival.chainId && (
              <ContractsQuestions
                festivalChainId={festival.chainId}
                questionChainId={resource.chainId}
              />
            )}

          <ButtonSubmit />
        </Form>
      </ViewAdmin>

      <FooterAdmin>
        <ButtonIcon to={returnUrl}>
          {translate('default.buttonReturnToOverview')}
        </ButtonIcon>
      </FooterAdmin>
    </Fragment>
  );
};

export default AdminQuestionsEdit;
