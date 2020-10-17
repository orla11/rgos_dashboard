// axios
import axios from 'axios'

const baseURL = 'https://rgos-dashboard.firebaseio.com/'

export default axios.create({
  baseURL
})
