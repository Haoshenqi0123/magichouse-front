<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="handleSelect"
    @blur="getImgList(state)"
    ></el-autocomplete>

    <div class="demo-image">
        <div class="block" v-for="item in items" :key="item">
            <!-- <span class="demonstration">{{ item.title }}</span>  -->
            <img :src="host+item.url" class="ui image lazy biaoqingbao-img" :alt="item.name" :title="item.name" :data-original="item.url" >

        </div>
    </div>
  </div>
</template>

<script src="../js/vueJs/vue-resource.js"></script>
<script>
import {getImgLists} from  '../api/biaoqingbao.js';
export default {
  name: 'Biaoqingbao',
  data () {
    return {
      restaurants: [],
      state: '',
      timeout:  null,
      host: "http://biaoqingbao.haoshenqi.top",
      items: [
        {'name': '老司机', 'url': '/img/fa2bed5c-7fac-11e9-ac84-00163e06485f.jpg'},
        {'name': '开始', 'url': '/fa29bcda-7fac-11e9-ac84-00163e06485f.jpg'}
      ],
      msg: 'Welcome to magichouse'
    }
  },
  methods: {
       loadAll() {
        return [
            {'value': '老司机'},
            {'value': '开始'}
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
     getImgList(name) {
        console.log("state="+name)
        this.listLoading = true;
        return new Promise((resolve, reject) => {
            console.log("state="+name)
          getImgLists(name).then(response => {
            this.listLoading = false;
            const { data } = response;
            if (data.error === 200) {
              this.items = data.message.data;
            } else {
              this.$message.error(data.error_description);
            }
          }).catch(error => {
              console.log("error")
          //   this.listLoading = false;
            reject(error);
          });
        });
    },
    },
    mounted() {
      this.restaurants = this.loadAll();
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
.biaoqingbao-img{
    max-height: 188px;
    margin: 0px auto;
    display: block;
}
</style>
