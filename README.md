# vuepress-plugin-vdoing-comment

[![](https://img.shields.io/badge/online-preview-faad14.svg?style=popout-square)](https://terwer.space/post/hello-world.html)
[![](https://img.shields.io/badge/vuepress-v1.x-3eaf7c.svg?style=popout-square)](https://vuepress.vuejs.org/)
![](https://img.shields.io/badge/license-MIT-blue.svg?style=popout-square)
![version](https://img.shields.io/github/release/terwer/vuepress-plugin-vdoing-comment.svg?style=flat-square)

Support popluar comment plugins in Vuepress, supports Gitalk, Valine, Artalk...

It is well-tested via [vuepress-vdoing-theme](https://github.com/xugaoyi/vuepress-theme-vdoing)

- [vuepress-plugin-vdoing-comment](#vuepress-plugin-vdoing-comment)
  - [Copyright](#copyright)
  - [FAQ](#faq)
  - [Features](#features)
  - [Usage](#usage)
    - [Install](#install)
    - [⚠️Route object properties](#️route-object-properties)
    - [Use in Gitalk](#use-in-gitalk)
    - [Use in Valine](#use-in-valine)
    - [Use in Artalk](#use-in-artalk)
    - [How to hide page comment](#how-to-hide-page-comment)

## Copyright

This project is a enhance version of [https://github.com/dongyuanxin/vuepress-plugin-comment](https://github.com/dongyuanxin/vuepress-plugin-comment)

## FAQ

1.  Artalk server crash after post a comment?

    it is a bug, already fixed in 1.0.2 .

2.  Some times comment component not load?

    Clear browser cache and reload page again.

3.  Dark mode not look well?

    add following css to `docs/.vuepress/styles/palette.styl`
  
    ```css
    .theme-mode-dark #vuepress-plugin-vdoing-comment {
      --at-color-bg: --bodyBg;
      color: #ffffff;
      --at-color-font: #ffffff;
      --at-color-bg-transl: --bodyBg;
      --at-color-bg-grey: #373a40
    }
    
    .theme-mode-dark #vuepress-plugin-vdoing-comment .atk-editor-plug-emoticons > .atk-grp-switcher > span:hover, .atk-editor-plug-emoticons > .atk-grp-switcher > span.active {
      background: var(--at-color-bg-grey);
    }
    
    .theme-mode-dark #vuepress-plugin-vdoing-comment .atk-editor-plug-emoticons > .atk-grp-switcher {
      background: var(--at-color-bg-grey)
    }
    ```

If you have other questions, please mail to youweics@163.com or open an issue

## Features

- Support Gitalk, Valine, Artalk
- Dynamic Import
- Response router change and refresh automatic
- User can use passage's `$frontmatter`

## Usage

### Install

With `npm`:

```bash
npm install --save vuepress-plugin-vdoing-comment
```

With `yarn`:

```bash
yarn add vuepress-plugin-vdoing-comment -D
```

With `cnpm`:

```bash
cnpm i --save vuepress-plugin-vdoing-comment
```

### ⚠️Route object properties

**Don't use `window` object directly to get route information**.

Plugin has registered correct route information in `frontmatter.to` object and `frontmatter.from` object. Their properties are the same as [vue-router's route object](https://router.vuejs.org/api/#route-object-properties).

### Use in Gitalk

The `options` is exactly the same as `Gitalk` configuration.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-vdoing-comment',
      {
        choosen: 'gitalk', 
        options: {
          clientID: 'GitHub Application Client ID',
          clientSecret: 'GitHub Application Client Secret',
          repo: 'GitHub repo',
          owner: 'GitHub repo owner',
          admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
          distractionFreeMode: false 
        }
      }
    ]
  ]
}
```

If you want to access variables, such as `$frontmatter` and `window`, please use **EJS** syntax.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-vdoing-comment',
      {
        choosen: 'gitalk', 
        options: {
          id: '<%- frontmatter.commentid || frontmatter.permalink %>',
          title: '「Comment」<%- frontmatter.title %>',
          body: '<%- frontmatter.title %>：<%-window.location.origin %><%- frontmatter.to.path || window.location.pathname %>',
          clientID: 'GitHub Application Client ID',
          clientSecret: 'GitHub Application Client Secret',
          repo: 'GitHub repo',
          owner: 'GitHub repo owner',
          admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
          distractionFreeMode: false,
        }
      }
    ]
  ]
}
```

**Note**: Never use callback function in plugin configuration, that will be filtered by vuepress. So I have to support EJS syntax.

### Use in Valine

The `options` is exactly the same as `Valine` configuration.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-vdoing-comment',
      {
        choosen: 'valine', 
        options: {
          el: '#valine-vuepress-comment',
          appId: 'Your own appId',
          appKey: 'Your own appKey'
        }
      }
    ]
  ]
}
```

If you want to access variables, such as `$frontmatter` and `window`, please use **EJS** syntax.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-vdoing-comment',
      {
        choosen: 'valine', 
        options: {
          el: '#valine-vuepress-comment',
          appId: 'Your own appId',
          appKey: 'Your own appKey',
          path: '<%- frontmatter.commentid || frontmatter.permalink %>'
        }
      }
    ]
  ]
}
```

### Use in Artalk

The `options` is **different** from `Gitalk` configuration.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-vdoing-comment',
      {
        choosen: 'artalk',
        options: {
            server: 'https://my-artalk-server',
            site: '站点名称',
        }
      }
    ]
  ]
}
```

### How to hide page comment

If you want to hide comment plugin in specified page, set `$frontmatter.comment` or `$frontmatter.comments` to `false`.

For example:

```yml
---
comment: false
# comments: false 
---
```

Comment won't appear in the page of this passage. 