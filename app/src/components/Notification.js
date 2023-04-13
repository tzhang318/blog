export const Notification = ({ message, success }) => {
  const classnames = success ? 'notification success-message' : 'notification error-message';
  return message ? <div className={classnames}>{ message }</div> : null;
};
