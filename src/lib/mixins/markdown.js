import hljsLangs from '../core/hljs/lang.hljs.js'
import {
    loadScript
} from '../core/extra-function.js'
import sanitizer from '../core/sanitizer.js'

/*eslint-disable */
var markdown_config = {
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,        // Use '/' to close single tags (<br />).
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
    linkify: false,        // 自动识别url
    typographer: true,
    quotes: '“”‘’'
}

var MarkdownIt = require('markdown-it')
var emoji = require('markdown-it-emoji')
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
// <dl/>
var deflist = require('markdown-it-deflist')
// <abbr/>
var abbr = require('markdown-it-abbr')
// footnote
var footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins')
// mark
var mark = require('markdown-it-mark')
// taskLists
var taskLists = require('markdown-it-task-lists')
// container
var container = require('markdown-it-container')
// color
var color = require('markdown-it-color')
//
var toc = require('markdown-it-toc')
//  markdown-it-multimd-table
var multimd = require('markdown-it-multimd-table')
//
var mihe = require('markdown-it-highlightjs-external');
// math katex
//var katex = require('markdown-it-katex-external');
var katex = require('./markdown-it-katex');
var miip = require('markdown-it-images-preview');
var missLangs = {};
var needLangs = [];
var hljs_opts = {
    hljs: 'auto',
    highlighted: true,
    langCheck: function (lang) {
        if (lang && hljsLangs[lang] && !missLangs[lang]) {
            missLangs[lang] = 1;
            needLangs.push(hljsLangs[lang])
        }
    }
};

export function initMarkdown() {
    const markdown = new MarkdownIt(markdown_config);
    // add target="_blank" to all link
    var defaultRender = markdown.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        var hIndex = tokens[idx].attrIndex('href');
        if (tokens[idx].attrs[hIndex][1].startsWith('#')) return defaultRender(tokens, idx, options, env, self);
        // If you are sure other plugins can't add `target` - drop check below
        var aIndex = tokens[idx].attrIndex('target');

        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
        } else {
            tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
        }
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
    };

    markdown.use(mihe, hljs_opts)
        .use(emoji)
        .use(sup)
        .use(sub)
        .use(container)
        .use(container, 'hljs-left') /* align left */
        .use(container, 'hljs-center')/* align center */
        .use(container, 'hljs-right')/* align right */
        .use(deflist)
        .use(abbr)
        .use(footnote)
        .use(insert)
        .use(mark)
        .use(container)
        .use(miip)
        .use(katex)
        .use(taskLists)
        .use(toc)
        .use(multimd,{
          multiline:  true,
          rowspan:    true,
          headerless: true,
          multibody:  true,
          aotolabel:  true,
        })
        .use(color.default, {
          inline: true
        })
        .use(container, 'box', {
          validate: function(params) {
            //  ::: box
            return params.trim().match(/box/);
          },
          render: function (tokens, idx) {
            const m = tokens[idx].info.trim().match(/box\s+(.*)$/);
            const arg = (m) ? m[1] : null;
            if (tokens[idx].nesting === 1) {
              // opening tag
              return '<div class="okcanvas-markdown-box">\n';
            } else {
              // closing tag
              return '</div>\n';
            }
          }
        })
        .use(container, 'view', {
          validate: function(params) {
            //  ::: box
            return params.trim().match(/view/);
          },
          render: function (tokens, idx) {
            const m = tokens[idx].info.trim().match(/view\s+(.*)$/);
            const arg = (m) ? m[1] : null;
            if (tokens[idx].nesting === 1) {
              // opening tag
              var text = (arg) ? `<div style="text-align: center;">&lt; ${arg} &gt;</div>\n` : '';
              text += '<div class="okcanvas-markdown-box">\n'; 
              return text;
            } else {
              // closing tag
              return '</div>\n';
            }
          }
        })

    return markdown;
}

/*
<table style="border-collapse: collapse; width: 100%;" border="0">
    <tbody>
    <tr>
      <td style="width: 33.3333%;">&nbsp;</td>
      <td style="text-align: center;"><보기></td>
      <td style="width: 33.3333%;">&nbsp;</td>
    </tr>
    <tr style="border: 1px solid black;">
      <td colspan="3">
        sdfsdfsfsfdsfs
      </td>
    </tr>
    </tbody>
  </table>

*/


export default {
    data() {
        return {
            markdownIt: null
        }
    },
    created() {
        this.markdownIt = initMarkdown();
        if (!this.html) {
            this.markdownIt.set({ html: false });
            this.xssOptions = false;
        } else if (typeof this.xssOptions === 'object') {
            this.markdownIt.use(sanitizer, this.xssOptions);
        }
    },
    mounted() {
        hljs_opts.highlighted = this.ishljs;
    },
    methods: {
        $render(src, func) {
            var $vm = this;
            missLangs = {};
            needLangs = [];
            var res = this.markdownIt.render(src);
            if (this.ishljs) {
                if (needLangs.length > 0) {
                    $vm.$_render(src, func, res);
                }
            }
            func(res);
        },
        $_render(src, func, res) {
            var $vm = this;
            var deal = 0;
            for (var i = 0; i < needLangs.length; i++) {
                var url = $vm.p_external_link.hljs_lang(needLangs[i]);
                loadScript(url, function () {
                    deal = deal + 1;
                    if (deal === needLangs.length) {
                        res = this.markdownIt.render(src);
                        func(res);
                    }
                })
            }
        }
    },
    watch: {
        ishljs: function (val) {
            hljs_opts.highlighted = val;
        }
    }
};
