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
    }
    
}

export default new Layout()