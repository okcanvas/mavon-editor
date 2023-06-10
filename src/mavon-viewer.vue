<template>
  <div :class="[{ 'fullscreen': s_fullScreen, 'shadow': boxShadow }]" class="v-note-viewer-wrapper markdown-body" :style="{'box-shadow': boxShadow ? boxShadowStyle : ''}">
      <div class="v-note-viewer-panel">
          <div class="v-note-viewer-show">
              <div ref="vShowContent" 
                v-html="d_render" 
                :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle}" class="v-show-viewer-content"
                :style="{'background-color': background}">
              </div>
          </div>

      </div>
  </div>
</template>

<script>
import {keydownListen} from './lib/core/keydown-listen.js'
import hljsCss from './lib/core/hljs/lang.hljs.css.js'
import {
  fullscreenchange,
  getNavigation,
  loadLink,
  loadScript,
  ImagePreviewListener
} from './lib/core/extra-function.js'
import {stopEvent} from './lib/util.js'
import {CONFIG} from './lib/config.js'
import markdown, {initMarkdown} from './lib/mixins/markdown.js'
import "./lib/font/css/fontello.css"
import './lib/css/md.css'

export default {
  mixins: [markdown],
  props: {
      scrollStyle: {  // webkit
          type: Boolean,
          default: true
      },
      boxShadow: { //
          type: Boolean,
          default: true
      },
      transition: { //
          type: Boolean,
          default: true
      },
      fontSize: { //
          type: String,
          default: '14px'
      },
      background: { //
          type: String,
          default: '#fbfbfb'
      },
      boxShadowStyle: { //
          type: String,
          default: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
      },
      value: { // value
          type: String,
          default: ''
      },
      language: {  //
          type: String,
          default: 'en'
      },
      subfield: {
          type: Boolean,
          default: true
      },
      navigation: {
          type: Boolean,
          default: false
      },
      defaultOpen: {
          type: String,
          default: null
      },
      html: {// Enable HTML tags in source
          type: Boolean,
          default: true
      },
      codeStyle: { // <code></code>
          type: String,
          default() {
              return 'github';
          }
      },
      externalLink: {
          type: [Object, Boolean],
          default: true
      }
  },
  data() {
      return {
          s_subfield: (() => {
              return this.subfield;
          })(),
          s_navigation: (() => {
              return this.navigation;
          })(),
          s_scrollStyle: (() => {
              return this.scrollStyle
          })(),
          d_value: '',
          d_render: '',
          s_preview_switch: (() => {
              let default_open_ = this.defaultOpen;
              if (!default_open_) {
                  default_open_ = this.subfield ? 'preview' : 'edit';
              }
              return default_open_ === 'preview' ? true : false;
          })(),
          s_fullScreen: false,
          d_words: null,
          s_external_link: {
              markdown_css: function() {
                  return 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css';
              },
              hljs_js: function() {
                  return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js';
              },
              hljs_lang: function(lang) {
                  return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/languages/' + lang + '.min.js';
              },
              hljs_css: function(css) {
                  if (hljsCss[css]) {
                      return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/' + css + '.min.css';
                  }
                  return '';
              },
              // katex_js: function() {
              //    return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js';
              // },
              katex_css: function() {
                return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.css';
              }
          },
          p_external_link: {}
      };
  },
  created() {
      var $vm = this;
      this.initLanguage();
      this.initExternalFuc();
  },
  mounted() {
      var $vm = this;
      keydownListen(this);
      ImagePreviewListener(this);
      fullscreenchange(this);
      this.d_value = this.value || "";
      this.loadExternalLink('markdown_css', 'css');
      this.loadExternalLink('katex_css', 'css')
      // this.loadExternalLink('katex_js', 'js', function() {
      //    $vm.iRender(true);
      // })
      this.loadExternalLink('hljs_js', 'js', function() {
          $vm.iRender(true);
      })

      $vm.codeStyleChange($vm.codeStyle, true)
  },
  beforeDestroy() {
      document.body.removeChild(this.$refs.help);
  },
  getMarkdownIt() {
      let mdIt = this.mixins[0].data().markdownIt;
      if (!mdIt) {
          mdIt = initMarkdown();
      }
      return mdIt
  },
  methods: {
      loadExternalLink(name, type, callback) {
          if (typeof this.p_external_link[name] !== 'function') {
              if (this.p_external_link[name] !== false) {
                  console.error('external_link.' + name, 'is not a function, if you want to disabled this error log, set external_link.' + name, 'to function or false');
              }
              return;
          }
          var _obj = {
              'css': loadLink,
              'js': loadScript
          };
          if (_obj.hasOwnProperty(type)) {
              _obj[type](this.p_external_link[name](), callback);
          }
      },
      initExternalFuc() {
          var $vm = this;
          var _external_ = ['markdown_css', 'hljs_js', 'hljs_css', 'hljs_lang', 'katex_js', 'katex_css'];
          var _type_ = typeof $vm.externalLink;
          var _is_object = (_type_ === 'object');
          var _is_boolean = (_type_ === 'boolean');
          for (var i = 0; i < _external_.length; i++) {
              if ((_is_boolean && !$vm.externalLink) || (_is_object && $vm.externalLink[_external_[i]] === false)) {
                  $vm.p_external_link[_external_[i]] = false;
              } else if (_is_object && typeof $vm.externalLink[_external_[i]] === 'function') {
                  $vm.p_external_link[_external_[i]] = $vm.externalLink[_external_[i]];
              } else {
                  $vm.p_external_link[_external_[i]] = $vm.s_external_link[_external_[i]];
              }
          }
      },
      getNavigation($vm, full) {
          return getNavigation($vm, full);
      },
      fullscreen(status, val) {
          this.$emit('fullScreen', status, val)
      },
      initLanguage() {
          let lang = CONFIG.langList.indexOf(this.language) >= 0 ? this.language : 'zh-CN';
          var $vm = this;
          $vm.$render(CONFIG[`help_${lang}`], function(res) {
              $vm.d_help = res;
          })
          this.d_words = CONFIG[`words_${lang}`];
      },
      codeStyleChange(val, isInit) {
          isInit = isInit ? isInit : false;
          if (typeof this.p_external_link.hljs_css !== 'function') {
              if (this.p_external_link.hljs_css !== false)
              { console.error('external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false'); }
              return;
          }
          var url = this.p_external_link.hljs_css(val);
          if (url.length === 0 && isInit) {
              console.warn('hljs color scheme', val, 'do not exist, loading default github');
              url = this.p_external_link.hljs_css('github')
          }
          if (url.length > 0) {
              loadLink(url,null,"md-code-style");
          } else {
              console.warn('hljs color scheme', val, 'do not exist, hljs color scheme will not change');
          }
      },
      iRender(toggleChange) {
          var $vm = this;
          this.$render($vm.d_value, function(res) {
              $vm.d_render = res;
              if (!toggleChange)
              {
                  if ($vm.change) $vm.change($vm.d_value, $vm.d_render);
              }
              if ($vm.s_navigation) getNavigation($vm, false);
          })
      }
  },
  watch: {
      d_value: function (val, oldVal) {
          this.iRender();
      },
      value: function (val, oldVal) {
          if (val !== this.d_value) {
              this.d_value = val
          }
      },
      subfield: function (val, oldVal) {
          this.s_subfield = val
      },
      language: function (val) {
          this.initLanguage();
      },
      defaultOpen: function (val) {
          let default_open_ = val;
          if (!default_open_) {
              default_open_ = this.subfield ? 'preview' : 'edit';
          }
          this.s_preview_switch = default_open_ === 'preview' ? true : false;
          return this.s_preview_switch;
      },
      codeStyle: function (val) {
          this.codeStyleChange(val)
      }
  },
  components: {
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "lib/css/scroll.styl"
  @import "lib/css/mavon-viewer.styl"
</style>
