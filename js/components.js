var templateImagem = '<div > \
                <div class="reserva-image">\
                    <options-colors :cores="grupo.produtos" v-on:emitcor="selectcor"></options-colors>\
                    <a class="link-loja" :href="grupo.produtos[0].productUrl"> \
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
    data: function(){
        productUrl : this.grupo.produtos[0].productUrl
    },
    methods:{
        selectcor: function(item){
            console.log('------------------------------------');
            console.log(item);
            console.log('------------------------------------');
            var cor = item.produtoCor.split('/')[5].substr(0, 3);
            $(this.$el).find('.img-product').attr("src", item.produtoImage );
            $(this.$el).find('.link-loja').attr("href", item.productUrl + '?prodc=' + cor);
        }
    },
    template: templateImagem
  })


  var colors = '<div class="options-colors">\
                    <ul>\
                        <li class="liqui" v-for="cor in cores" v-on:click="emitcor(cor)">\
                            <img :src="cor.produtoCor" alt="cor.productTitle">\
                        </li>\
                    </ul>\
                    <button class="hidden"> <a class="link-loja" :href="cores[0].productUrl"> adicionar à sacola </a> </button>\
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
    methods:{
        emitcor: function(cor){
            this.$emit('emitcor', cor);
        }
    },
    template: colors
  })