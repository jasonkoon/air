import { Axios } from 'axios';

export const notify = (state: boolean) => {
  const status = state ? 'On' : 'Off';
  const data = {
    characteristic: status,
    value: true,
    password: 'air-comp',

    accessory: 'air-comp', // optional, plugin defined
    service: 'air-comp', // optional, plugin defined
  };

  const axios: Axios = new Axios();
  axios.post('http://kserve.kraquen.com:8032/air-comp');
};
