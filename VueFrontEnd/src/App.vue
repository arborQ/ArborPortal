<template>
    <div class="page-container">
      <md-app>
        <md-app-toolbar class="md-primary">
          <span class="md-title">My Vue Portal</span>
        </md-app-toolbar>

        <md-app-drawer md-permanent="full">
          <md-toolbar class="md-transparent" md-elevation="0">
            Navigation
          </md-toolbar>

          <md-list>
          <md-list-item>
              <a class="md-list-item-text" href="#/">Home</a>
            </md-list-item>
            <md-list-item>
              <a class="md-list-item-text" href="#/login">Login</a>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
