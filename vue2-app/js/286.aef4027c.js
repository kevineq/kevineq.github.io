"use strict";(self["webpackChunkone_app"]=self["webpackChunkone_app"]||[]).push([[286],{6691:function(t,s,e){e.d(s,{Z:function(){return c}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"list-item"},[s("div",{staticClass:"cover"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.listItem.cover,expression:"listItem.cover"}]})]),s("div",{staticClass:"info"},[s("div",{staticClass:"title"},[t._v(t._s(t.listItem.title))]),s("div",{staticClass:"subtitle"},[t._v(t._s(t.listItem.subtitle))])])])},a=[],r={props:{listItem:Object},methods:{}},n=r,o=e(1001),l=(0,o.Z)(n,i,a,!1,null,"73d1dfda",null),c=l.exports},8286:function(t,s,e){e.r(s),e.d(s,{default:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"reading-view"},[t._l(t.searchContentList,(function(t){return s("SearchCard",{key:t.content_id,attrs:{listItem:t}})})),t.show?s("div",{staticClass:"null"}):t._e(),t.isloading?s("van-loading",{staticClass:"loading"}):t._e()],2)},a=[],r=e(6691),n=e(4787),o=e(3822),l={data(){return{searchContentList:[],show:!1,keyword:"",isloading:!0}},computed:{word(){if("/radio"==this.$route.path.slice(7))return this.$route.query.keyword}},watch:{word(t){t&&this.keyword!=t&&this.getData()}},activated(){let{category:t,keyword:s}=this.$route.query;this.setActive(parseInt(t)),this.keyword!=s&&(this.searchContentList=[],this.getData())},methods:{...(0,o.OI)(["setActive"]),getData(t=0){this.searchContentList=[],this.show=!1;let{category:s,keyword:e}=this.$route.query;this.keyword=e,this.show=!1,(0,n.eO)({axios:this.$axios,category:s,keyword:e,page:t}).then((({data:t})=>{if(0==t.data.list.length)return this.show=!0,void this.$nextTick((()=>{this.isloading=!1}));this.searchContentList=t.data.list,this.$nextTick((()=>{this.isloading=!1}))}))}},components:{SearchCard:r.Z}},c=l,d=e(1001),h=(0,d.Z)(c,i,a,!1,null,"1f266022",null),u=h.exports}}]);
//# sourceMappingURL=286.aef4027c.js.map