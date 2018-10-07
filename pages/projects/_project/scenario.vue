<template>
  <ace-editor :value="content" lang="python" theme="tomorrow_night" height="500" @init="initEditor"></ace-editor>
</template>

<script>

export default {
  data: () => ({
    content: '# turn on the air conditioner when air temperature goes up'
  }),

  methods: {
    initEditor (editor) {
      require('brace/mode/python')
      require('brace/theme/tomorrow_night')

      editor.setShowPrintMargin(false)
      editor.setShowInvisibles(true)
    }
  }
}
</script>
