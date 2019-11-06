<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Titre</v-toolbar-title>
      <v-spacer/>
      <v-btn icon @click="dialog = !dialog">
        <v-icon>link</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">

          <vue-drag-resize
            v-if="imageUrl"
            :is-active="true"
            :w="200"
            :h="200"
            :style="'background-image: url(' + imageUrl + '); background-size:100% 100%;'"
            @resizing="resize"
            @dragging="resize">
            <p>{{ top }} х {{ left }} </p>
            <p>{{ width }} х {{ height }}</p>
          </vue-drag-resize>

          <v-text-field
            v-model="imageName"
            label="Select Image"
            prepend-icon="attach_file"
            @click="pickFile"/>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFilePicked">
        </v-flex>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Hello World!</v-card-title>
            <v-card-text>Image Upload Script in VUE JS
              <hr>Yubaraj Shrestha
            <br>http://yubarajshrestha.com.np/</v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click.native="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>

    <v-alert
      :value="true"
      :dismissible="true"
      :elevation="3"
      type="success">
      You have successfully installed vuetify 2 with Laravel 6 !
    </v-alert>
  </v-app>

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
      left: 0,
      title: 'Image Upload',
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },

  methods: {
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    },

    pickFile () {
      this.$refs.image.click()
    },

    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }

  }
}
</script>
