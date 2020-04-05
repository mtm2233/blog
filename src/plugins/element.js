import Vue from 'vue'
import {
  Container, Header, Main, Footer, Aside, Row, Col, Menu, MenuItem,
  Message, MessageBox, Input, Drawer, Carousel, CarouselItem, Image,
  MenuItemGroup, Submenu
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Drawer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

// 全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
