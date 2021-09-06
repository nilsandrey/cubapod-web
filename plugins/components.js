import Vue from 'vue'
import LazyImg from '~/components/LazyImg'
import LayoutHeader from '~/components/LayoutHeader'
import BooleanWidget from '~/components/BooleanWidget'
import CopyButton from '~/components/CopyButton'
import Info from '~/components/Info'
import Error from '~/components/Error'
import Modal from '~/components/Modal'
import NotFound from '~/components/NotFound'
import MarkdownBlock from '~/components/MarkdownBlock'
import Paginator from '~/components/Paginator'
import BooleanNullableRadio from '~/components/BooleanNullableRadio'
import Loading from '~/components/Loading'

Vue.component('lazy-img', LazyImg)
Vue.component('layout-header', LayoutHeader)
Vue.component('boolean-widget', BooleanWidget)
Vue.component('copy-button', CopyButton)
Vue.component('info', Info)
Vue.component('error', Error)
Vue.component('modal', Modal)
Vue.component('not-found', NotFound)
Vue.component('markdown-block', MarkdownBlock)
Vue.component('paginator', Paginator)
Vue.component('boolean-nullable-radio', BooleanNullableRadio)
Vue.component('loading', Loading)
