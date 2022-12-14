import ejs from 'ejs'

import config from './package.json'

let Gitalk, Valine, Artalk
loadScript(COMMENT_CHOOSEN)

const defaultChoosen = 'comment plugins'
console.log(
    `How to use "${COMMENT_CHOOSEN || defaultChoosen}" in ${config.name}@v${config.version}:`,
    config.homepage
)

/**
 * Lazy load pkg
 * 
 * @param {String} name 
 */
export function loadScript(name) {
    if (name === 'valine') {
        import('valine')
            .then(pkg => Valine = pkg.default)
    } else if (name === 'gitalk') {
        import('gitalk/dist/gitalk.css')
            .then(() => import('gitalk'))
            .then(pkg => Gitalk = pkg.default)
    } else if (name === "artalk") {
        import('artalk/dist/Artalk.css')
            .then(() => import('artalk'))
            .then(pkg => Artalk = pkg.default)
    }
}

/**
 * Render ejs strings in configuration
 * 
 * @param {Object} config 
 * @param {Object} data 
 */
export function renderConfig(config, data) {
    const result = {}

    Reflect.ownKeys(config)
        .forEach(key => {
            if (typeof config[key] === 'string') {
                try {
                    result[key] = ejs.render(config[key], data)
                } catch (error) {
                    console.warn(`Comment config option error at key named "${key}"`)
                    console.warn(`More info: ${error.message}`)
                    result[key] = config[key]
                }
            } else {
                result[key] = config[key]
            }
        })

    return result
}

/**
 * Support Gitalk and so on.
 */
export const provider = {
    gitalk: {
        render(frontmatter, commentDomID) {
            const commentDOM = document.createElement('div')
            commentDOM.id = commentDomID

            const parentDOM = document.querySelector(COMMENT_CONTAINER)
            parentDOM.appendChild(commentDOM)

            const gittalk = new Gitalk(renderConfig(COMMENT_OPTIONS, { frontmatter }))
            gittalk.render(commentDomID)
        },
        clear(commentDomID) {
            const last = document.querySelector(`#${commentDomID}`)
            if (last) {
                last.remove()
            }
            return true
        }
    },

    valine: {
        render(frontmatter, commentDomID) {
            const commentDOM = document.createElement('div')
            commentDOM.id = commentDomID

            const parentDOM = document.querySelector(COMMENT_CONTAINER)
            parentDOM.appendChild(commentDOM)

            new Valine({
                ...renderConfig(COMMENT_OPTIONS, { frontmatter }),
                el: `#${commentDomID}`
            })
        },
        clear(commentDomID) {
            const last = document.querySelector(`#${commentDomID}`)
            if (last) {
                last.remove()
            }
            return true
        }
    },

    artalk: {
        render(frontmatter, commentDomID) {
            const commentDOM = document.createElement('div')
            commentDOM.id = commentDomID

            const parentDOM = document.querySelector(COMMENT_CONTAINER)
            parentDOM.appendChild(commentDOM)

            new Artalk({
                // ...renderConfig(COMMENT_OPTIONS, { frontmatter }),
                el: `#${commentDomID}`,
                pageKey: '', // ????????????
                pageTitle: '', // ????????????
                server: COMMENT_OPTIONS.server, // ????????????
                site: COMMENT_OPTIONS.site,
            });

            setTimeout(() => {
                if (COMMENT_OPTIONS.disableEmotion) {
                    const btnList = document.querySelectorAll("span.atk-plug-btn")
                    btnList.forEach(btn => {
                        if (btn.innerHTML.trim().indexOf("??????") > -1) {
                            var picElem = btn
                            // console.log(picElem)
                            picElem.remove()
                        }
                    })
                }

                if (COMMENT_OPTIONS.disablePicture) {
                    const btnList = document.querySelectorAll("span.atk-plug-btn")
                    btnList.forEach(btn => {
                        if (btn.innerHTML.trim().indexOf("??????") > -1) {
                            var picElem = btn
                            // console.log(picElem)
                            picElem.remove()
                        }
                    })
                }

                if (COMMENT_OPTIONS.disablePreview) {
                    const btnList = document.querySelectorAll("span.atk-plug-btn")
                    btnList.forEach(btn => {
                        if (btn.innerHTML.trim().indexOf("??????") > -1) {
                            var picElem = btn
                            // console.log(picElem)
                            picElem.remove()
                        }
                    })
                }
            }, 500)
        },
        clear(commentDomID) {
            const last = document.querySelector(`#${commentDomID}`)
            if (last) {
                last.remove()
            }
            return true
        }
    }
}