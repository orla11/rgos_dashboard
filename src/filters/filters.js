import Vue from 'vue'

Vue.filter('title', function (value, replacer = '_') {
  if (!value) return ''
  value = value.toString()

  const arr = value.split(replacer)
  const capitalized_array = []
  arr.forEach((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalized_array.push(capitalized)
  })
  return capitalized_array.join(' ')
})

Vue.filter('date', function (value, replacer = '_') {
  if (!value) return ''

  let date = new Date(value)

  return date.toDateString() + ' ' + date.toLocaleTimeString()
})

Vue.filter('shortDay', function (value) {
  if (!value) return ''

  return value.substr(0,3)
})

Vue.filter('shortText', function (value) {
  if (!value) return ''

  if(value.length > 8){
    return value.substr(0,7) + '...'
  }

  return value
})
