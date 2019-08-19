"use strict";

const url = "https://gpwj6t53mb.execute-api.ap-northeast-2.amazonaws.com/dev/posts";

Vue.component('news-list', {
  props: ['results'],
  template: `
    <section>
      <div class="row" v-for="posts in processedPosts">
        <div class="columns" v-for="post in posts">
          <div class="card">
          <div class="card-divider">
          {{ post.title }}
          </div>
          <div class="date-box">
          <span class=""> Created at: {{ post.createdAt}} </span><br />
          <span class=""> Updated at: {{ post.updatedAt}} </span>
          <a :href="post.imageUrl" target="_blank"><img :src="post.imageUrl"></a>
          <div class="card-section">
            <p>{{ post.body }}</p>
          </div>
          <div class="author">
            <p>{{ post.authorId }}</p>
          </div>
        </div>
        </div>
      </div>
  </section>
  `,
  computed: {
    processedPosts() {
      let posts = this.results;

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});

const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    section: 'home', // set default section to 'home'
    loading: true,
    title: ''
  },
  mounted () {
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      axios.get(url).then((response) => {
        this.loading = false;
        this.results = response.data.data;
      }).catch((error) => { console.log(error); });
    }
  }
});
