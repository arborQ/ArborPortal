<template>
  <md-card>
    <md-card-header>
    {{msg}}
    </md-card-header>
    <md-card-media>
        <div class="md-title">
            <md-field>
                <label>Required Field</label>
                <md-input v-model="required" required></md-input>
                <span class="md-error">There is an error</span>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
            </md-field>
        </div>
    </md-card-media>
    <md-card-actions>
        <md-button href="#/">Cancel</md-button>
        <md-button class="md-primary" type="submit">Login</md-button>
    </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      msg: 'Login to my app screen',
      required: 'arbor',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .md-card {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 10px;
    }
</style>
