// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    // baseURL: '/api',
    withCredentials: true,
    timeout: 5000                  // 请求超时时间
  });
  




axios
.get('https://www.runoob.com/try/ajax/json_demo.json')
.then(response => (this.info = response))
.catch(function (error) { // 请求失败处理
  console.log(error);
});