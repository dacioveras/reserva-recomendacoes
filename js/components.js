var templateImagem = '<div> \
        <a :href="produto.productUrl"> \
            <div class="mz-slider--content"> \
                <div class="mz-slider--content__image">\
                    <img class="img-product" :src="produto.produtoImage" onerror="this.style.display=\'none\'"/>\
                </div> \
                <div class="mz-slider--content__description">\
                    <div class="mz-slider--content__description--top">\
                        <h5 >{{produto.productTitle}}</h5>\
                    </div>\
                    <div class="mz-slider--content__description--bottom">\
                        <span class="mz-atom--price">\
                            <span v-if="produto.productPrice === produto.productPriceWithOption">\
                                <span class="mz-atom--price__value">R$ {{ produto.productPrice }}.00</span>\
                            </span>\
                            <span v-else>\
                                <span class="mz-atom--price__desc">De R$ {{ produto.productPriceWithOption }}.00 por</span>\
                                <span class="mz-atom--price__value"> R$ {{ produto.productPrice }}.00</span>\
                            </span>\
                            <span v-if="(produto.productPrice / 60) >= 2">\
                                <span class="mz-atom--price__desc">\
                                    <br />{{ ( produto.productPrice / 60 ).toFixed() }}X de R$ {{ ( (produto.productPrice) / ( (produto.productPrice / 60).toFixed() ) ).toFixed(2) }}\
                                </span>\
                            </span>\
                            <span v-else></span>\
                        </span>\
                    </div>\
                </div> \
            </div>\
        </a>\
    </div>';

Vue.component('reserva-image', {
    props: { 
      produto:{
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods:{},
    template: templateImagem
  })

  //subcomponentes do reserva image

 

  //componentes das opções de cores.
  Vue.component('options-colors', {
    template: '<div>colors</div>'
  })