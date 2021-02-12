import "./components/index";
import App from "./components/App.vue";
Vue.nextTick(()=>{
    let app = new Vue({
        el:"#app",
        template:`
            <div>
                <span>测试</span>
                <App></App>
            </div>
        `,
        components:{
            App
        }
    });
    
})
