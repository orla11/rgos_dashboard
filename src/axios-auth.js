// axios
import axios from 'axios'

const baseURL = 'https://identitytoolkit.googleapis.com/v1/';

export default axios.create({
  baseURL
})
