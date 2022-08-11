import{_ as s,c as a,o as e,a as l}from"./app.0c8a55e6.js";const y=JSON.parse('{"title":"Vue2 Webpack \u914D\u7F6E\u63D2\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F"},{"level":3,"title":"1. \u5B89\u88C5\u4F9D\u8D56","slug":"_1-\u5B89\u88C5\u4F9D\u8D56"},{"level":3,"title":"2. \u542F\u7528\u914D\u7F6E","slug":"_2-\u542F\u7528\u914D\u7F6E"},{"level":2,"title":"\u63D2\u4EF6\u914D\u7F6E","slug":"\u63D2\u4EF6\u914D\u7F6E"},{"level":3,"title":"htmlOption","slug":"htmloption"},{"level":3,"title":"sprite","slug":"sprite"},{"level":3,"title":"enableXss","slug":"enablexss"},{"level":2,"title":"index.html","slug":"index-html"},{"level":2,"title":".vue \u6587\u4EF6","slug":"vue-\u6587\u4EF6"},{"level":2,"title":"\u6837\u5F0F\u6587\u4EF6","slug":"\u6837\u5F0F\u6587\u4EF6"},{"level":2,"title":"\u5A92\u4F53\u8D44\u6E90","slug":"\u5A92\u4F53\u8D44\u6E90"}],"relativePath":"plugin/plugin-vue2.md"}'),n={name:"plugin/plugin-vue2.md"},p=l(`<h1 id="vue2-webpack-\u914D\u7F6E\u63D2\u4EF6" tabindex="-1">Vue2 Webpack \u914D\u7F6E\u63D2\u4EF6 <a class="header-anchor" href="#vue2-webpack-\u914D\u7F6E\u63D2\u4EF6" aria-hidden="true">#</a></h1><p>Vue2 \u76F8\u5173\u7684 Webpack \u914D\u7F6E\u3002</p><blockquote><p>\u9700\u8981\u6CE8\u610F Vue 2.6 \u548C Vue 2.7 \u662F\u4E0D\u517C\u5BB9\uFF0C\u5347\u7EA7\u8BF7\u5145\u5206\u6D4B\u8BD5\u4FDD\u8BC1\u517C\u5BB9</p></blockquote><h2 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h2><p>\u652F\u6301 Vue \u7248\u672C <code>&gt;= 2.6.0</code></p><h3 id="_1-\u5B89\u88C5\u4F9D\u8D56" tabindex="-1">1. \u5B89\u88C5\u4F9D\u8D56 <a class="header-anchor" href="#_1-\u5B89\u88C5\u4F9D\u8D56" aria-hidden="true">#</a></h3><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm install @pure-org/water-plugin-vue2 --save-dev</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-\u542F\u7528\u914D\u7F6E" tabindex="-1">2. \u542F\u7528\u914D\u7F6E <a class="header-anchor" href="#_2-\u542F\u7528\u914D\u7F6E" aria-hidden="true">#</a></h3><p>\u4FEE\u6539 <code>pure.config.js</code> \u6216\u8005 <code>preset</code> \u7684\u914D\u7F6E</p><div class="language-diff"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"> module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">   plugins: {</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">    vue2: {}</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"></span></code></pre></div><h2 id="\u63D2\u4EF6\u914D\u7F6E" tabindex="-1">\u63D2\u4EF6\u914D\u7F6E <a class="header-anchor" href="#\u63D2\u4EF6\u914D\u7F6E" aria-hidden="true">#</a></h2><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ISpriteOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sourceDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IPluginVu2Options</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">htmlOption</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HtmlWebpackPlugin</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Options</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sprite</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ISpriteOption</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">enableXss</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="htmloption" tabindex="-1">htmlOption <a class="header-anchor" href="#htmloption" aria-hidden="true">#</a></h3><p>\u53C2\u8003 <code>html-webpack-plugin</code> \u7684 <a href="https://github.com/jantimon/html-webpack-plugin#options" target="_blank" rel="noopener noreferrer">HtmlWebpackPlugin#Options</a></p><h3 id="sprite" tabindex="-1">sprite <a class="header-anchor" href="#sprite" aria-hidden="true">#</a></h3><p>\u57FA\u4E8E<code>svg-sprite-loader</code>\u5B9E\u73B0\u3002\u9ED8\u8BA4\u662F\uFF1A<code>false</code> \u5173\u95ED\u96EA\u78A7\u56FE Loader</p><p><code>sourceDir</code> \u5B58\u653E svg \u683C\u5F0F\u7684\u96EA\u78A7\u56FE\u76EE\u5F55\u3002</p><h3 id="enablexss" tabindex="-1">enableXss <a class="header-anchor" href="#enablexss" aria-hidden="true">#</a></h3><p>vue \u662F <code>v-html</code> \u6307\u4EE4\u662F\u5426\u505A XSS \u8FC7\u6EE4\u3002</p><p>\u5982\u679C\u5F00\u542F\u9700\u8981\uFF0C\u9879\u76EE\u91CC\u5B89\u88C5<code>xss</code>\u5305\uFF0C\u5E76\u5C06<code>xss</code>\u6302\u8F7D\u5230 vue \u539F\u578B\u4E0A\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> xss </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xss</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">xss </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> xss</span></span>
<span class="line"></span></code></pre></div><h2 id="index-html" tabindex="-1">index.html <a class="header-anchor" href="#index-html" aria-hidden="true">#</a></h2><p>\u9ED8\u8BA4 index.html \u5728 <code>&lt;projectRoot&gt;/public/index.html</code>\u3002</p><h2 id="vue-\u6587\u4EF6" tabindex="-1"><code>.vue</code> \u6587\u4EF6 <a class="header-anchor" href="#vue-\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u652F\u6301 <code>.vue</code> \u6587\u4EF6\u7F16\u8BD1</p><h2 id="\u6837\u5F0F\u6587\u4EF6" tabindex="-1">\u6837\u5F0F\u6587\u4EF6 <a class="header-anchor" href="#\u6837\u5F0F\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u652F\u6301<code>.css</code> <code>.scss</code>\u6837\u5F0F\u6587\u4EF6\u7F16\u8BD1\u3002\u8D44\u6E90\u8F93\u51FA\u8DEF\u5F84\uFF1A<code>css/[name]_[contenthash:8].css</code>\u3002</p><p>\u4F7F\u7528 Dart Sass \u4F5C\u4E3A Sass \u89E3\u6790\u5B9E\u73B0\uFF0C\u907F\u514D\u4F9D\u8D56\u5B89\u88C5\u95EE\u9898\u3002</p><h2 id="\u5A92\u4F53\u8D44\u6E90" tabindex="-1">\u5A92\u4F53\u8D44\u6E90 <a class="header-anchor" href="#\u5A92\u4F53\u8D44\u6E90" aria-hidden="true">#</a></h2><p>\u652F\u6301 <code>.svg</code> <code>.png</code> <code>jpg</code> \u7B49\u8D44\u6E90\u6587\u4EF6\u7684\u8F6C\u6362\u3002</p><p>\u9ED8\u8BA4\u5C06\u8F6C\u6362\u4E3A\uFF1A<code>(imgs|media|fonts)/[name]_[hash:8][ext]</code></p><p>\u652F\u6301\u7684\u6587\u4EF6\u540E\u7F00\uFF1A</p><ul><li>imgs \u56FE\u7247 <ul><li>svg</li><li>png</li><li>jpe?g</li><li>gif</li><li>webp</li><li>avif</li></ul></li><li>media \u89C6\u9891 <ul><li>map4</li><li>webm</li><li>ogg</li><li>mp3</li><li>wav</li><li>flac</li><li>acc</li></ul></li><li>fonts \u5B57\u4F53 <ul><li>woff2</li><li>eot</li><li>ttf</li><li>otf</li></ul></li></ul>`,33),o=[p];function t(c,i,r,d,h,u){return e(),a("div",null,o)}var F=s(n,[["render",t]]);export{y as __pageData,F as default};
