import{_ as e,c as a,o as s,a as n}from"./app.eb734d83.js";const v=JSON.parse('{"title":"Vue2 \u9879\u76EE","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F"},{"level":3,"title":"1. \u5B89\u88C5\u4F9D\u8D56","slug":"_1-\u5B89\u88C5\u4F9D\u8D56"},{"level":3,"title":"2. \u542F\u7528\u914D\u7F6E","slug":"_2-\u542F\u7528\u914D\u7F6E"}],"relativePath":"preset/preset-vue2.md"}'),r={name:"preset/preset-vue2.md"},l=n(`<h1 id="vue2-\u9879\u76EE" tabindex="-1">Vue2 \u9879\u76EE <a class="header-anchor" href="#vue2-\u9879\u76EE" aria-hidden="true">#</a></h1><p><code>@pure-org/water-preset-vue2</code> \u662F\u57FA\u4E8E Webpack \u5C01\u88C5\uFF0C\u63D0\u4F9B\u7ED9 Vue2 + JavaScript \u9879\u76EE\u7684 Preset\u3002</p><p><strong>Babel \u914D\u7F6E preset-env \u6784\u5EFA\u4EA7\u7269\u7684\u76EE\u6807\u914D\u7F6E\u662F\uFF1A<code>&gt; 2%, not dead</code>\u3002</strong></p><p>\u63D0\u4F9B\u4EE5\u4E0B\u80FD\u529B\uFF1A</p><ul><li><code>pure dev</code>: \u542F\u52A8 Dev Server</li><li><code>pure build</code>: \u6784\u5EFA\u751F\u4EA7\u8D44\u6E90\u4EA7\u7269</li><li><code>pure lint</code>: \u68C0\u67E5 Js/Vue \u4EE3\u7801\uFF0C\u4EE5\u53CA CSS \u548C Scss \u6837\u5F0F\u4EE3\u7801</li><li>commit message lint: \u5BBD\u677E\u7684\u6821\u9A8C\u89C4\u5219 <ul><li>\u53EF\u4EE5\u4E0D\u586B scope</li><li>\u4E0D\u9650\u5236 header/body/footer \u957F\u5EA6\uFF0C\u4F1A\u8B66\u544A</li></ul></li></ul><h2 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h2><h3 id="_1-\u5B89\u88C5\u4F9D\u8D56" tabindex="-1">1. \u5B89\u88C5\u4F9D\u8D56 <a class="header-anchor" href="#_1-\u5B89\u88C5\u4F9D\u8D56" aria-hidden="true">#</a></h3><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm install @pure-org/water-preset-vue2 --save-dev</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-\u542F\u7528\u914D\u7F6E" tabindex="-1">2. \u542F\u7528\u914D\u7F6E <a class="header-anchor" href="#_2-\u542F\u7528\u914D\u7F6E" aria-hidden="true">#</a></h3><p>\u4FEE\u6539 <code>pure.config.js</code>.</p><div class="language-diff"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"> module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">   name: &#39;your-project-name&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">  presets: [&#39;vue2&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"></span></code></pre></div>`,11),p=[l];function t(o,c,i,d,u,_){return s(),a("div",null,p)}var f=e(r,[["render",t]]);export{v as __pageData,f as default};
