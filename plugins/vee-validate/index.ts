import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'
import { createValidators } from './vee-validators'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

createValidators()
