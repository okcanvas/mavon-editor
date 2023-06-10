@ [toc](Catalog)


## 문제 15
::: view 1234 5678 9012
==모든 항이 자연수==이고 다음 조건을 만족시키는 모든 수열 $\left\{a_{n}\right\}$ 에 대하여 $a_{9}$ 의 최댓값과 최솟값을 각각 $M, m$ 이라 할 때, $M+m$ 의 값은? [4점]
:::

$$
\begin{aligned}
& \text { (가) } a_{7}=40 \\
& \text { (나) 모든 자연수 } n \text { 에 대하여 }
\end{aligned}
$$

$a_{n+2}= \begin{cases}a_{n+1}+a_{n} & \left(a_{n+1} \text { 이 } 3 \text { 의 배수가 아닌 경우 }\right) \\ \frac{1}{3} a_{n+1} & \left(a_{n+1} \text { 이 } 3 \text { 의 배수인 경우 }\right)\end{cases}$

이다.
(1) 216
(2) 218
(3) 220
(4) 222
(5) 224

Markdown Guide
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
```
**bold**
__bold__
```
## *Italic*
```
*italic*
_italic_
```
## Header
```
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
```
## Dividing line
```
***
---
```
****
## ^Super^script & ~Sub~script
```
super x^2^
sub H~2~0
```
## ++Underline++ & ~~Strikethrough~~
```
++underline++
~~strikethrough~~
```
## ==Mark==
```
==mark==
```
## Quote

```
> quote 1
>> quote 2
>>> quote 3
...
```

## List
```
ol
1.
2.
3.
...

ul
-
-
...
```

## Todo List

- [x] task 1
- [ ] task 2

```
- [x] task 1
- [ ] task 2
```

## Link
```
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
```
## Code
\``` type

code block

\```

\` code \`

```c++
int main()
{
    printf("hello world!");
}
```
`code`

## Table
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
```
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
```
hello[^hello]
```

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
```
:laughing:
:blush:
:smiley:
:)
...
```
:laughing::blush::smiley::)

## $\KaTeX$ Mathematics

We can render formulas for example：$x_i + y_i = z_i$ and $\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
`::: hljs-left`
`left`
`:::`
:::

::: hljs-center
`::: hljs-center`
`center`
`:::`
:::

::: hljs-right
`::: hljs-right`
`right`
`:::`
:::

## deflist

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

```

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
