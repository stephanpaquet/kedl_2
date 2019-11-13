<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Titre</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>

            <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>

            <v-stepper-step step="3">Name of step 3</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
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
              <v-divider/>
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
            </v-stepper-content>

            <v-stepper-content step="2"/>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"/>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-btn
          :disabled="step === 1"
          color="primary"
          @click="step -= 1">
          Retour
        </v-btn>
        <v-btn
          :disabled="step === 3"
          color="primary"
          @click="step += 1">
          Continue
        </v-btn>
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
/* global axios */

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
      imageFile: '',
      step: 1
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
        const fileReader = new FileReader()
        console.log(fileReader)
        fileReader.readAsDataURL(files[0])
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          const formData = new FormData()

          console.log('this.imageFile', this.imageFile)
          console.log('this.imageUrl', this.imageUrl)
          formData.append('file', files[0])
          formData.append('size', this.imageFile.size)
          formData.append('type', this.imageFile.type)
          formData.append('name', this.imageFile.name)

          axios.post('/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(function () {
            console.log('SUCCESS!!')
          })
            .catch(function () {
              console.log('FAILURE!!')
            })
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
