<template>
  <div>
    <v-app>
      <v-alert
        :value="true"
        :dismissible="true"
        :elevation="3"
        type="success">
        You have successfully installed vuetify 2 with Laravel 6 !
      </v-alert>

      <vue-drag-resize
        :is-active="true"
        :w="200"
        :h="200"
        @resizing="resize"
        @dragging="resize">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
      </vue-drag-resize>
    </v-app>

  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
  name: 'AppVue',

  components: {
    VueDragResize
  },

  data () {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },

  methods: {
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    }
  }
}
</script>
