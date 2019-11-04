<template>
    <v-app>
        <v-alert :value="true"  :dismissible="true" :elevation="3" type="success">
            You have successfully installed vuetify 2 with Laravel 6 !
        </v-alert>
    </v-app>
</template>

<script>
    export default {
        name: "App.vue"
    }
</script>

