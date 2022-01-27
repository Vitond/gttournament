import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? '/backend' :'http://localhost:3000'

const instance = axios.create({
    baseURL: url
  });

export default instance;