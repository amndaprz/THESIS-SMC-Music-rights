import React from 'react';
import "./Notif.css";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Example extends React.Component {
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'success':
          NotificationManager.success( 'Purchase Successful!');
          break;
        case 'error':
          NotificationManager.error('Purchase Failed!');
          break;
      }
    };
  };

  render() {
    return (
      <div>
        <button className='btn btn-success'
          onClick={this.createNotification('success')}>Success
        </button>
        <button className='btn btn-danger'
          onClick={this.createNotification('error')}>Error
        </button>

        <NotificationContainer/>
      </div>
    );
  }
}

export default Example;