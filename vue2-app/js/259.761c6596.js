"use strict";(self["webpackChunkone_app"]=self["webpackChunkone_app"]||[]).push([[259],{6691:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list-item"},[e("div",{staticClass:"cover"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.listItem.cover,expression:"listItem.cover"}]})]),e("div",{staticClass:"info"},[e("div",{staticClass:"title"},[t._v(t._s(t.listItem.title))]),e("div",{staticClass:"subtitle"},[t._v(t._s(t.listItem.subtitle))])])])},a=[],r={props:{listItem:Object},methods:{}},n=r,o=s(1001),l=(0,o.Z)(n,i,a,!1,null,"73d1dfda",null),c=l.exports},4259:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"reading-view"},[t._l(t.searchContentList,(function(t){return e("SearchCard",{key:t.content_id,attrs:{listItem:t}})})),t.show?e("div",{staticClass:"null"}):t._e(),t.isloading?e("van-loading",{staticClass:"loading"}):t._e()],2)},a=[],r=s(6691),n=s(4787),o=s(3822),l={data(){return{searchContentList:[],show:!1,keyword:"",isloading:!0}},computed:{word(){if("/hp"==this.$route.path.slice(7))return this.$route.query.keyword}},watch:{word(t){t&&this.keyword!=t&&this.getData()}},activated(){let{category:t,keyword:e}=this.$route.query;this.setActive(parseInt(t)),this.keyword!=e&&(this.searchContentList=[],this.getData())},methods:{...(0,o.OI)(["setActive"]),getData(t=0){let{category:e,keyword:s}=this.$route.query;this.keyword=s,this.show=!1,(0,n.eO)({axios:this.$axios,category:e,keyword:s,page:t}).then((({data:t})=>{if(0==t.data.list.length)return this.show=!0,void this.$nextTick((()=>{this.isloading=!1}));this.searchContentList=t.data.list,this.$nextTick((()=>{this.isloading=!1}))}))}},components:{SearchCard:r.Z}},c=l,d=s(1001),h=(0,d.Z)(c,i,a,!1,null,"5b2fa52c",null),u=h.exports}}]);
//# sourceMappingURL=259.761c6596.js.map