<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
@import '@/bulma-theme.scss';
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #616771;
  background-color: #eef2f5;
  min-height:100vh;
  font-size: 1rem;
  input{
    height: 2.5em;
    margin-right: 0.3em;
  }
  input[type=text]{
    font-size: 1rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: #616771;
  }
  input[type=number]{
    font-size: 1rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: #616771;
    width: 50px;
  }
  h1 {
    font-size: 3rem;
    font-family: 'Montserrat SemiBold', Helvetica, Arial, sans-serif;
    color: #4267B3;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  .logo{
    max-height: 80vh;
  }
  .title {
    color: #4267B3;
  }
  ul {
  list-style-type: none;
  padding: 0;
  }
  li {
    margin: 0 10px;
  }
  .help {
    font-size: 0.9rem;
  }
  .container {
  height: 80vh;
  position: relative;
}

  .team{
    width: 30%;
    position: relative;
      top: 50%;
    float: left;
  }
  .vertical-center {
    margin: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .guess{
    position: relative;
    float: left;
    width : 40%;
  }
}

</style>
