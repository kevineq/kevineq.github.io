"use strict";(self["webpackChunkone_app"]=self["webpackChunkone_app"]||[]).push([[447],{8447:function(t,e,l){l.r(e),l.d(e,{default:function(){return I}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"collect-detail-view"},[e("van-nav-bar",{attrs:{title:t.collectTitle,fixed:""},scopedSlots:t._u([{key:"left",fn:function(){return[e("van-icon",{attrs:{name:"arrow-left",size:"20",color:"#bbb"},on:{click:t.back}})]},proxy:!0}])}),"hp"==t.category?e("div",{staticClass:"content-warp1"},t._l(t.contentList,(function(l){return e("CollentHpCard",{key:l.id,staticClass:"animate__animated animate__zoomInRight",attrs:{listItem:l},on:{select:function(e){return t.selectedDateArticle(l.date)}}})})),1):t._e(),"hp"!=t.category?e("div",{staticClass:"content-warp"},t._l(t.contentList,(function(l){return e("CollectMusicCard",{key:l.id,staticClass:"animate",attrs:{listItem:l},on:{select:function(e){return t.selectedDateArticles(l.date)}}})})),1):t._e()],1)},a=[],i=(l(7658),function(){var t=this,e=t._self._c;return e("div",{staticClass:"month-article",on:{click:function(e){return t.$emit("select",t.listItem.date)}}},[e("div",{staticClass:"date-img"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.listItem.imgUrl,expression:"listItem.imgUrl"}],staticClass:"lazyload-img"}),e("div",{staticClass:"date-volume"},[t._v(t._s(t.listItem.volume))]),e("div",{staticClass:"date-dateObj"},[t._v(t._s(t.listItem.dateObj))])]),e("div",{staticClass:"date-text"},[e("div",{staticClass:"van-multi-ellipsis--l2"},[t._v(" "+t._s(t.listItem.forward)+" ")])])])}),c=[],r={props:{listItem:Object}},o=r,n=l(1001),u=(0,n.Z)(o,i,c,!1,null,"445ec5b8",null),d=u.exports,m=function(){var t=this,e=t._self._c;return e("van-swipe-cell",{scopedSlots:t._u([{key:"right",fn:function(){return[e("van-button",{staticClass:"delete-button",attrs:{round:"",text:"取消收藏",color:"#003153",size:"small"},on:{click:t.noCollect}})]},proxy:!0}])},[e("div",{ref:"collect",staticClass:"list-item",on:{click:function(e){return t.$emit("select",t.listItem.category,t.listItem.id)}}},[e("div",{staticClass:"cover"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.listItem.cover,expression:"listItem.cover"}]})]),e("div",{staticClass:"info"},[e("div",{staticClass:"title"},[t._v(t._s(t.listItem.title))]),e("div",{staticClass:"subtitle"},[t._v(t._s(t.listItem.subtitle))])]),e("van-icon",{attrs:{name:"arrow",color:"#999"}})],1)])},v=[],p={props:{listItem:Object},methods:{noCollect(){let t=this.$route.query.category+"-"+this.listItem.category+"-"+this.listItem.id;localStorage.removeItem(t),this.$refs.collect.remove()}}},h=p,f=(0,n.Z)(h,m,v,!1,null,"429a9121",null),g=f.exports,C={props:{collectTitle:String},data(){return{contentList:[],show:!0,category:""}},created(){this.getData()},methods:{selectedDateArticle(t){this.$router.push({path:"/hpDetail",query:{date:t}})},selectedDateArticles(t,e){this.$router.push({path:"/articleDetail",query:{category:t,id:e}})},back(){this.$router.go(-1)},getData(){let t=this.$route.query.category;this.category=t;let e=[],l=[];if("hp"==t)for(let s=0;s<localStorage.length;s++){let l=localStorage.key(s);l.slice(0,2)==t&&e.push(l)}else if("article"==t)for(let s=0;s<localStorage.length;s++){let l=localStorage.key(s);l.slice(0,7)==t&&e.push(l)}else for(let s=0;s<localStorage.length;s++){let l=localStorage.key(s);l.slice(0,5)==t&&e.push(l)}for(let s=0;s<e.length;s++){let t=localStorage[e[s]],a=JSON.parse(t);l.push(a),this.contentList=l}}},components:{CollentHpCard:d,CollectMusicCard:g}},_=C,y=(0,n.Z)(_,s,a,!1,null,"81a1c53c",null),I=y.exports}}]);
//# sourceMappingURL=447.fd5434e1.js.map