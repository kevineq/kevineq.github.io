"use strict";(self["webpackChunkone_app"]=self["webpackChunkone_app"]||[]).push([[167],{7066:function(t,i,e){e.d(i,{Z:function(){return d}});var s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"list-item",on:{click:t.goSerializeDetail}},[i("div",{staticClass:"pic"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.listItem.cover,expression:"listItem.cover"}]}),i("div",{staticClass:"title"},[t._v("《"+t._s(t.listItem.title)+"》")]),i("div",{staticClass:"finished"},[t._v(" "+t._s(1==t.listItem.finished?"# 已完结":"# 连载中")+" ")]),i("div",{staticClass:"loyar"})]),i("div",{staticClass:"info"},[i("div",{staticClass:"forward"},[t._v(t._s(t.listItem.forward))]),i("div",{staticClass:"subtitle"},[t._v(t._s(t.listItem.subtitle))])])])},a=[],l=e(3822),r={props:{listItem:Object},methods:{...(0,l.OI)(["setSerializeTitle"]),goSerializeDetail(){this.setSerializeTitle(this.listItem.title),this.$emit("select",this.listItem.serial_id)}}},n=r,c=e(1001),o=(0,c.Z)(n,s,a,!1,null,"465093f8",null),d=o.exports},8167:function(t,i,e){e.r(i),e.d(i,{default:function(){return h}});var s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"serialize-view"},[t._l(t.serialcontentList,(function(e){return i("SerializeCard",{key:e.id,attrs:{listItem:e},on:{select:t.selectedDateArticle}})})),t.isloading?i("van-loading",{staticClass:"loading"}):t._e()],2)},a=[],l=(e(7658),e(881)),r=e(7066),n=e(4787),c={data(){return{serialcontentList:[],isloading:!0}},created(){this.getData=(0,l.Z)(this.getData)},mounted(){this.getData()},methods:{selectedDateArticle(t){this.$router.push({path:"/serialize/serializeDetail",query:{id:t}})},getData(){(0,n.EN)({axios:this.$axios,date:this.$route.path.slice(11)}).then((({data:t})=>{this.serialcontentList=t.data,this.$nextTick((()=>{this.isloading=!1}))}))}},components:{SerializeCard:r.Z}},o=c,d=e(1001),u=(0,d.Z)(o,s,a,!1,null,"14f325db",null),h=u.exports}}]);
//# sourceMappingURL=167.b0997f17.js.map