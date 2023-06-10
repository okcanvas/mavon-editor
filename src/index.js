'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */
const mavonEditor = require('./mavon-editor.vue');
const VueMavonEditor = {
    /**
     * @deprecated
     * @see mavonEditor.getMarkdownIt()
     */
    markdownIt: mavonEditor.mixins[0].data().markdownIt,
    mavonEditor: mavonEditor,
    LeftToolbar: require('./components/md-toolbar-left'),
    RightToolbar: require('./components/md-toolbar-right'),
    install: function(Vue) {
        Vue.component('mavon-editor', mavonEditor);
    }
};

const mavonViewer = require('./mavon-viewer.vue');
const VueMavonViewer = {
    /**
     * @deprecated
     * @see mavonEditor.getMarkdownIt()
     */
    markdownIt: mavonViewer.mixins[0].data().markdownIt,
    mavonViewer: mavonViewer,
    install: function(Vue) {
        Vue.component('mavon-viewer', mavonViewer);
    }
};

module.exports = {
    VueMavonEditor,
    VueMavonViewer
}
