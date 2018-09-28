/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 28-09-2018
 * |
 * | File Name:     toast.js
 * +===============================================
 */
import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}

// register the toast with the custom message for errors
Vue.toasted.register('iError',
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return 'Oops.. Something Went Wrong..'
    }

    // if there is a message show it with the message
    return payload.message
  },
  {
    type: 'error',
    icon: 'error_outline',
    closeOnSwipe: true,
    duration: 5000 // 5s
  }
)

// register the toast with the custom message for notifications
Vue.toasted.register('iSuccess',
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return 'Everything is ok'
    }

    // if there is a message show it with the message
    return payload.message
  },
  {
    type: 'success',
    icon: 'done',
    closeOnSwipe: true,
    duration: 5000 // 5s
  }
)
