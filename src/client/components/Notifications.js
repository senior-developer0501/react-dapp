import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeNotification } from '~/client/store/notifications/actions';

const Notifications = () => {
  const { messages } = useSelector((state) => state.notifications);

  if (messages.length === 0) {
    return null;
  }

  return (
    <ul>
      <NotificationsList items={messages} />
    </ul>
  );
};

const NotificationsList = (props) => {
  return props.items.map((item) => {
    return (
      <NotificationsItem
        id={item.id}
        key={item.id}
        lifetime={item.lifetime}
        text={item.text}
        type={item.type}
      />
    );
  });
};

const NotificationsItem = ({ id, lifetime, text }) => {
  const dispatch = useDispatch();

  const onRemove = useCallback(() => {
    dispatch(removeNotification(id));
  }, [dispatch, id]);

  useEffect(() => {
    let timeout;

    if (lifetime > 0) {
      timeout = window.setTimeout(() => {
        onRemove();
      }, lifetime);
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [onRemove, lifetime]);

  return <li onClick={onRemove}>{text}</li>;
};

NotificationsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      lifetime: PropTypes.number,
      text: PropTypes.string,
      type: PropTypes.symbol,
    }),
  ).isRequired,
};

NotificationsItem.propTypes = {
  id: PropTypes.number.isRequired,
  lifetime: PropTypes.number,
  text: PropTypes.string.isRequired,
  type: PropTypes.symbol.isRequired,
};

export default Notifications;
