<template>
  <div id="app">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
  height: 100%;
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
  option{
    font-size: 1rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: #616771;
  }
  select{
    font-size: 1rem;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: #616771;
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
