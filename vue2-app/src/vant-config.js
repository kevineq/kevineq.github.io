import {
    Icon,
    Lazyload,
    Loading,
    PullRefresh,
    NavBar,
    Popup,
    Slider,
    List,
    DatetimePicker,
    Search,
    Tab,
    Tabs,
    Sticky,
    Toast,
    SwipeCell,
    Button,

} from 'vant'

const vantComponents = [
    Icon,
    Lazyload,
    Loading,
    PullRefresh,
    NavBar,
    Popup,
    Slider,
    List,
    DatetimePicker,
    Search,
    Tab,
    Tabs,
    Sticky,
    Toast,
    SwipeCell,
    Button,

]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}