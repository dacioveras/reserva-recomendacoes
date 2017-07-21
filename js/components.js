var templateImagem = '<div > \
            <div>\
                <options-colors :cores="grupo.produtos[0].produtoCor"></options-colors>\
                <a :href="grupo.produtos[0].productUrl"> \
                    <div class="mz-slider--content">\
                        <div class="mz-slider--content__image">\
                            <img class="img-product" :src="grupo.produtos[0].produtoImage" onerror="this.style.display=\'none\'"/>\
                        </div> \
                        <div class="mz-slider--content__description">\
                            <div class="mz-slider--content__description--top">\
                                <h5 >{{grupo.produtos[0].productTitle}}</h5>\
                            </div>\
                            <div class="mz-slider--content__description--bottom">\
                                <span class="mz-atom--price">\
                                    <span v-if="grupo.produtos[0].productPrice === grupo.produtos[0].productPriceWithOption">\
                                        <span class="mz-atom--price__value">R$ {{ grupo.produtos[0].productPrice }}.00</span>\
                                    </span>\
                                    <span v-else>\
                                        <span class="mz-atom--price__desc">De R$ {{ grupo.produtos[0].productPriceWithOption }}.00 por</span>\
                                        <span class="mz-atom--price__value"> R$ {{ grupo.produtos[0].productPrice }}.00</span>\
                                    </span>\
                                    <span v-if="(grupo.produtos[0].productPrice / 60) >= 2">\
                                        <span class="mz-atom--price__desc">\
                                            <br />{{ ( grupo.produtos[0].productPrice / 60 ).toFixed() }}X de R$ {{ ( (grupo.produtos[0].productPrice) / ( (grupo.produtos[0].productPrice / 60).toFixed() ) ).toFixed(2) }}\
                                        </span>\
                                    </span>\
                                    <span v-else></span>\
                                </span>\
                            </div>\
                        </div> \
                    </div>\
                </a>\
            </div>\
        </div>';

Vue.component('reserva-image', {
    props: { 
        grupo: {
            type: Object,
            default: function(){
                return {}
            }      
        }
    },    
    mounted: function() {
        return  console.log(this.grupo, 'Mounted');
    },
    template: templateImagem
  })


  var colors = '<div class="options-colors">\
                    <ul>\
                        <li class="liqui" v-for="cor in cores.produtoCor">\
                            <img :src="cor.produtoCor" alt="cor.productTitle">\
                        </li>\
                    </ul>\
                    <button> adicionar à sacola </button>\
                </div>'

  //componentes das opções de cores.
  Vue.component('options-colors', {
    props: {
        cores:{
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    template: colors
  })