import layoutView from '../views/layout.art'
import httpModel from '../models/http'
import '../../styles/bg.scss'

class Layout{
    constructor(){
        this.render();
    }

    async render(){
        let html = layoutView()
        $('.root').html(html)
        // window.onresize = function(){
        //     if( $('.move-bg').height()<$('body').height()){
        //         $('.move-bg').height($('body').height())
        //     }
        // }
    }
    
}

export default new Layout()