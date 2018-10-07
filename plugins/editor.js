/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 07-10-2018
 * |
 * | File Name:     editor.js
 * +===============================================
 */

import Vue from 'vue'
import Editor from 'vue2-ace-editor'

const EditorPlugin = {
  install (Vue, options) {
    Vue.component('ace-editor', Editor)
  }
}

Vue.use(EditorPlugin)
