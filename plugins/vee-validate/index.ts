import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'
import { createValidators } from './vee-validators'

createValidators()

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
