"use strict";(self["webpackChunkone_app"]=self["webpackChunkone_app"]||[]).push([[11],{9466:function(t,i,e){e.d(i,{Z:function(){return d}});var s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"list-item",on:{click:t.goArticleDetail}},[i("div",{staticClass:"cover"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.cover,expression:"cover"}]})]),i("div",{staticClass:"info"},[i("div",{staticClass:"title"},[t._v(t._s(t.title))]),i("div",{staticClass:"subtitle"},[t._v(t._s(t.subtitle))])])])},a=[],l=e(3822),r={props:{title:String,subtitle:String,cover:String,category:Number,id:Number},methods:{...(0,l.OI)(["setCollectObj"]),goArticleDetail(){this.setCollectObj({title:this.title,subtitle:this.subtitle,cover:this.cover}),this.$emit("select",this.category,this.id)}}},c=r,o=e(1001),n=(0,o.Z)(c,s,a,!1,null,"1dbd7a0f",null),d=n.exports},7011:function(t,i,e){e.r(i),e.d(i,{default:function(){return v}});var s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"serialize-detail-view"},[i("div",{staticClass:"title"},[i("van-icon",{staticClass:"arrow",attrs:{name:"arrow-left",size:"22",color:"#999"},on:{click:t.back}}),i("div",{staticClass:"text"},[t._v(t._s(t.serializeTitle))])],1),i("div",{staticClass:"content"},t._l(t.serializeDetailList,(function(e){return i("EssayCard",{key:e.id,attrs:{title:e.title,subtitle:e.subtitle,cover:e.cover,category:e.category,id:e.id},on:{select:t.selectedDateArticle}})})),1)])},a=[],l=(e(7658),e(4787)),r=e(9466),c=e(3822),o={data(){return{serializeDetailList:[],isloading:!0,id:""}},computed:{...(0,c.rn)(["serializeTitle"])},activated(){let t=this.$route.query.id;this.id!=t&&this.getData()},methods:{selectedDateArticle(t,i){this.$router.push({path:"/articleDetail",query:{category:t,id:i}})},back(){this.$router.go(-1)},getData(){this.id=this.$route.query.id,(0,l.vP)({axios:this.$axios,id:this.id}).then((({data:t})=>{this.serializeDetailList=t.data})),this.$nextTick((()=>{this.isloading=!1}))}},components:{EssayCard:r.Z}},n=o,d=e(1001),u=(0,d.Z)(n,s,a,!1,null,"9512ac1a",null),v=u.exports}}]);
//# sourceMappingURL=11.f6f0b327.js.map