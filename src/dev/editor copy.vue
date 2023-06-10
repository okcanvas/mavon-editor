

<template>
    <div class="container">
        <div id="editor">
            <mavon-viewer 
                style="height: 100%; font-size: 14px;" 
                v-model="code" 
                :codeStyle="codeStyle" 
                :xssOptions="xssOptions"
                :externalLink="external_link"
            >
            </mavon-viewer>
        </div>
        <div class="switch-code-style">
            <span>code style:</span>
            <select v-model="codeStyle">
                <option v-for="(val, key) in styles" :value="key">{{ key }}</option>
            </select>
        </div>
    </div>
</template>
<script>
import styles from '../lib/core/hljs/lang.hljs.css.js'

const code = `java
### 문제 15
==모든 항이 자연수==이고 다음 조건을 만족시키는 모든 수열 $\left\{a_{n}\right\}$ 에 대하여 $a_{9}$ 의 최댓값과 최솟값을 각각 $M, m$ 이라 할 때, $M+m$ 의 값은? [4점]

$$
\\begin{aligned}
& \\text { (가) } a_{7}=40 \\\\
& \\text { (나) 모든 자연수 } n \\text { 에 대하여 }
\\end{aligned}
$$

$a_{n+2}= \begin{cases}a_{n+1}+a_{n} & \left(a_{n+1} \text { 이 } 3 \text { 의 배수가 아닌 경우 }\right) \\ \frac{1}{3} a_{n+1} & \left(a_{n+1} \text { 이 } 3 \text { 의 배수인 경우 }\right)\end{cases}$

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
g(x)= \begin{cases}x & (x<-1 \text { 또는 } x>1) \\ f(x) & (-1 \leq x \leq 1)\end{cases}
$$

==함수 $h(x)=\lim _{t \rightarrow 0+} g(x+t) \times \lim _{t \rightarrow 2+} g(x+t)$ 에 대하여==

<보기>에서 ==옳은 것만을 있는 대로 고른== 것은? [4점]
`;

module.exports = {
    name: 'editor',
    data: function () {
        return {
            codeStyle: "github",
            styles,
            code: code,
            xssOptions:{
                whiteList: {
                    span: ['style']
                }
            },
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
                        return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js';
                        // return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js;'
                    },
                    katex_css: function() {
                        return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css';
                        // return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.css';
                    }
                }
        };
    }
}
</script>
<style>
.container {
    margin: auto;
    width: 80%;
}
#editor {
    height: 580px;
}
.switch-code-style {
    margin-top: 10px;
    font-size: 14px;
}
</style>
