const cacheName = "ydPWA-STEP-V1";
const filesToCache = [
    "/js/index.js",
    "/css/index.css",
    "/images/kebi.jpg",
    "/index.html",
    "/"
];
//self 是表示ServiceWork 作用域 也是全局变量
//caches 缓存对象
self.addEventListener("install",function (event) {
    //缓存对象
   console.log("安装阶段");
   event.waitUntil(updateStaticCache()); 
});
function updateStaticCache(){
    return caches.open(cacheName)
    .then(function(cache){
        //原子操作 如果中间有某一个文件挂了 全部缓存失败
        return cache.addAll(filesToCache);
    })
    //再页面更新的过程中 新的serviceWorker马上生效
    .then(()=>self.skipWaiting());
}
self.addEventListener("activate",function(event){
    //移除过期的对象 保证新的更新进入
    event.waitUntil(caches.keys().then(function(keysList){
        return Promise.all(keysList.map(function(key){
            console.log("Removing old cache",key);
            if(key !== cacheName){
                return caches.delete(key);
            }
        }));
    }));
});

self.addEventListener("fetch",function(event){
    console.log(event.request);
    //event.respondWith(new Response("Hello World"));
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    )
});