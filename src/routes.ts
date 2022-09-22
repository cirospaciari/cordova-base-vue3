export default [
    // adicionar / e index.html como home é necessário no cordova
    { path: '/', component: ()=> import('./pages/Home.vue') },
    { path: '/index.html', component: ()=> import('./pages/Home.vue')},
    { path: '/test', component: ()=> import('./pages/Test.vue') },
]