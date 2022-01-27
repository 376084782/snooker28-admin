import axios from "axios";

export let doAjax = axios.create({
  // baseURL: 'http://localhost:9020/',
  baseURL: 'http://39.101.162.107:9020/',
  headers: {  }
});