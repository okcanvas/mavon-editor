<template>
  <div id="app">
          <mavon-viewer ref=md 
                        language="en" 
                        :ishljs="true" 
                        class="item-editor" 
                        v-model="help1"
                        :externalLink="external_link"
                        :boxShadow="false"
                        :scrollStyle="true"
                        :transition="true"
                        codeStyle="agate"
                        style="line-height': 1.5; font-size: 14px;"
                        background="#ffffff">
          </mavon-viewer>
  </div>
</template>

<style>
.katex-display {
    display: inline-block;
    margin: 1em 0;
    text-align: center;
}
</style>

<script type="text/ecmascript-6">
  import styles from '../lib/core/hljs/lang.hljs.css.js'
  import {CONFIG} from '../lib/config.js'
  export default {
      name: 'app',
      data () {
          return {
              d_language: 'en',
              help1: '',
              screen_phone: false,
              styles,
              external_link: {
                    markdown_css: function() {
                        return '/markdown/github-markdown.min.css';
                    },
                    hljs_js: function() {
                        return '/highlightjs/highlight.min.js';
                    },
                    hljs_css: function(css) {
                        return '/highlightjs/styles/' + css + '.min.css';
                    },
                    hljs_lang: function(lang) {
                        return '/highlightjs/languages/' + lang + '.min.js';
                    },
                    /*
                    katex_css: function() {
                        return '/katex/katex.min.css';
                    },
                    katex_js: function() {
                        return '/katex/katex.min.js';
                    },
                    */
                    katex_js: function() {
                        // return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js';
                         return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js';
                    },
                    katex_css: function() {
                      // return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css';
                      // return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.css';
                      return 'http://app.repeach.net/katex.css';
                    }
                }
          }
      },
      created () {
          var $vm = this;
          this.initLanguage();
          this.sizeToStatus()
          window.addEventListener('resize', function() {
              $vm.sizeToStatus()
          })
      },
      mounted() {
          var md = this.$refs.md;
          var diy = this.$refs.diy;
      },
      methods: {
          clearCache() {
              this.$refs.md.$emptyHistory()
          },
          $click(val) {
              console.log(val);
          },
          sizeToStatus () {
              if (window.matchMedia('(min-width:768px)').matches) {
                  // > 768
                  this.screen_phone = false
              } else {
                  // <  768
                  this.screen_phone = true
              }
          },
          initLanguage() {
              // this.help1 = CONFIG[`help_en`]
              // return
              this.help1 = `

              ### 문제 18
두 수열 $\\left\\{a_{n}\\right\\},\\left\\{b_{n}\\right\\}$ 에 대하여
$\\sum_{k=1}^{5}\\left(3 a_{k}+5\\right)=55, \\quad \\sum_{k=1}^{5}\\left(a_{k}+b_{k}\\right)=32$ 일 때, $\\sum_{k=1}^{5} b_{k}$ 의 값을 구하시오. [3점]


### 문제 18
두 수열 $\\left\\{a_{n}\\right\\},\\left\\{b_{n}\\right\\}$ 에 대하여
$$
\\sum_{k=1}^{5}\\left(3 a_{k}+5\\right)=55, \\quad \\sum_{k=1}^{5}\\left(a_{k}+b_{k}\\right)=32
$$

일 때, $\\sum_{k=1}^{5} b_{k}$ 의 값을 구하시오. [3점]

### 문제 15
==모든 항이 자연수==이고 다음 조건을 만족시키는 모든 수열 $\\left\\{a_{n}\\right\\}$ 에 대하여 $a_{9}$ 의 최댓값과 최솟값을 각각 $M, m$ 이라 할 때, $M+m$ 의 값은? [4점]

$$
\\begin{aligned}
& \\text { (가) } a_{7}=40 \\\\
& \\text { (나) 모든 자연수 } n \\text { 에 대하여 }
\\end{aligned}
$$

$a_{n+2}= \\begin{cases}a_{n+1}+a_{n} & \\left(a_{n+1} \\text { 이 } 3 \\text { 의 배수가 아닌 경우 }\\right) \\\\ \\frac{1}{3} a_{n+1} & \\left(a_{n+1} \\text { 이 } 3 \\text { 의 배수인 경우 }\\right)\\end{cases}$

이다.

(1) 216
(2) 218
(3) 220
(4) 222
(5) 224

---
### 문제 14
다항함수 $f(x)$ 에 대하여 함수 $g(x)$ 를 다음과 같이 정의한다.

$$
g(x)= \\begin{cases}x & (x<-1 \\text { 또는 } x>1) \\\\ f(x) & (-1 \\leq x \\leq 1)\\end{cases}
$$              
              
              `;
          }
      },
      watch: {
          d_language: function () {
              this.initLanguage();
          }
      }
  }
  
/*
::: view adadad
dfsfsfsdfdsf
:::

mord mathrm hangul_fallback
*/
</script>

<style>
.markdown-body {
  font-size: 14px;
  background-color: rgb(255 255 255 / 50%);
}
.okcanvas-markdown-box {
  border: 1px solid black;
  padding: 10px;
  padding-bottom: 0px;
  margin-bottom: 1.5em;
}
.hangul_fallback {
font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
font-size: 0.85rem;
}
</style>



<style lang="stylus" rel="stylesheet/stylus">
  body
      margin 0
      padding 0
      padding-bottom 50px
  .switch-code-style
      display inline
      margin-left 8px
  .page-lang
      position absolute
      top 15px
      right 2%
  .page-header
      box-sizing border-box
      padding 90px 15px
      width 100%
      height 380px
      color #fff
      text-align center
      background-color #159957
      background-image linear-gradient(120deg, #155799, #159957)
      @media only screen and (max-width 958px)
          height 300px
          padding 60px 15px
      @media only screen and (max-width 768px)
          height 370px
          padding 50px 15px
      .project-name
          margin-top 0
          margin-bottom 0.1rem
          font-size 2.25rem
          @media only screen and (max-width 768px)
              font-size 25px
      .project-tagline
          margin-bottom 2rem
          font-weight normal
          opacity 0.7
          @media only screen and (max-width 768px)
              font-size 16px
      .btn
          padding: 0.6rem 0.9rem
          font-size: 0.9rem
          display: inline-block
          margin-bottom: 1rem
          color: rgba(255, 255, 255, 0.7)
          background-color: rgba(255, 255, 255, 0.08)
          border-color: rgba(255, 255, 255, 0.2)
          border-style: solid
          border-width: 1px
          border-radius: 0.3rem
          transition: color 0.2s, background-color 0.2s, border-color 0.2s
          text-decoration: none
          margin-left 20px
          box-sizing border-box
          &:hover
              color: rgba(255, 255, 255, 0.8)
              text-decoration: none
              background-color: rgba(255, 255, 255, 0.2)
              border-color: rgba(255, 255, 255, 0.3)
          @media only screen and (max-width 768px)
              display: block
              width: 90%
              padding: 0.75rem
              font-size: 0.9rem
              margin-left 5%
  .item
      width 75%
      margin-left 12.5%
      @media only screen and (max-width 1100px)
          width 85%
          margin-left 7.5%
      @media only screen and (max-width 768px)
          width 92%
          margin-left 4%
      .item-header
          margin-top: 3.5rem
          margin-bottom: 2rem
          font-weight: normal
          color: #159957
          @media only screen and (max-width 768px)
              margin-top: 2rem
              margin-bottom: 1rem
      .item-button
          margin-bottom: 4rem
      .item-editor
          width 100%
          height 700px
          @media only screen and (max-width 1600px)
              height 550px
</style>

