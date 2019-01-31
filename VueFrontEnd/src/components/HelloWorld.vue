<template>
  <md-empty-state
    md-rounded
    md-icon="access_time"
    md-label="Nothing in Snoozed"
    md-description="Anything you snooze will go here until it's time for it to return to the inbox.">
  </md-empty-state>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
