<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-html="html"></div>
    <button v-on:click="changeHtml" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "<b style='color:red'>v-html</b>"
    };
  },
  methods: {
    changeHtml: function() {
      this.html = "";
    }
  }
};
</script>