
var App = {};

$(function(){
  var app = new App.Application(document.body);
  app.run();  
});

App.Application = (function() {
  function Application(container) {
    this.container = $(container);
    this.state = {
      mail: null,
      sections: []
    };
  }

  Application.fn = Application.prototype;


  Application.fn.run = function() {
      console.log('Running!', this.state);

      this.sendSequest('lucasaborges@hotmail.com');
      this.initSliderCategory();
      this.insertContentHero();
      this.anchorHero();
      //this.errorImagem();

      // this.initClipboard();
  };
  
  Application.fn.errorImagem = function(event){
    console.log(event, arguments)
  }

  Application.fn.anchorHero = function() {
      var el = this.container.find('.mz-content-last')[0];

      el.addEventListener('click', function(e) {
        var anchorTo = this.container.find('.mz-section--slider__combinar');

        $('html,body').animate({
          scrollTop: anchorTo.offset().top
        }, 'slow');
      }.bind(this), false);
  };

  Application.fn.sendSequest = function(email) {
    var _self = this;
    this.state.mail = email;
    var RECSYS_URL = 'https://reservapto.com.br:3000/recapi/v1/rec/' + email;
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', RECSYS_URL, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var response = JSON.parse(xhttp.responseText);


          /**
           * o: objeto com o nô do json.
           * i: indice no Array.
           */
          _.map(response.recs, function(o, i){
            var data = {};

            data.sectionPosition = o.rank;
            data.sectionTitle = o.nome;
            data.sectionUrl = 'https://www.usereserva.com/' + o.nome;
            data.sectionProducts = [];
            
            var filteredIsEstoque = _.filter(o.produtos, function(o) {
              return o.estoque !== 0
            });

            _.map(filteredIsEstoque, function(obj, i) {
              var item = {};

              var productName = obj.titulo;
              var productUrl = 'https://www.usereserva.com/usereserva/p/produto/' + obj.produto;

              _.map(filteredIsEstoque, function(o, i) {
              var productName = o.titulo;
              var productUrl = 'https://www.usereserva.com/usereserva/p/produto/' + o.produto;

              _.map(o.cores, function(o, i) {
                if (o.estoque > 0) {
                    data.sectionProducts.push(
                      {
                        'productName': productName,
                        'productUrl': productUrl,
                        'produtoImage': o.imgUrl,
                        'productTitle': (o.titulo === '' ? productName : o.titulo),
                        'productPrice': o.preco_por,
                        'productPriceWithOption': o.preco_de
                      }
                    );
                  };
                });
              });
            });

            _self.state.sections.push(data);
            //console.log(_self.state.sections)
            if (i === 3) {
              _self.insertContentSlider();
            };
          });
        } else {
          console.log('ERROR: ', this.status);
        }
      };
    };
  };

  Application.fn.initClipboard = function() {
      var clipboard = new Clipboard('.cupom-button');

      clipboard.on('success', function(e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);

          e.clearSelection();
      });
  };

  Application.fn.initSliderCategory = function() {
      new Swiper('.swiper-container--categorias', {
          slidesPerView: 6,
          slidesPerGroup: 6,
          speed: 1000,     
          paginationClickable: true,
          nextButton: '.mz-bgSlider-next--categorias',
          prevButton: '.mz-bgSlider-prev--categorias',
          loop: false,
          spaceBetween: 30,
          breakpoints: {
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 30
            },
            1440: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 30
            }
          }
      });
  };

  Application.fn.insertContentHero = function() {
    var _self = this;

    new Vue({
      el: '#hero',
      data: {
        mail: _self.state.mail
      }
      
    });
  }

  Application.fn.insertContentSlider = function() {
    var _self = this;

    var loop = [
      "combinar",
      "ultimos",
      "polos",
      "camisetas"
    ];

    var filterCombinar = {};

    _.map(loop, function(id, index) {
      filterCombinar = _.filter(_self.state.sections, function(o) {
        return o.sectionPosition === index
      });

      new Vue({
        el: '#' + id,
        data: {
          section: filterCombinar[0].sectionProducts,
          sectionUrl: filterCombinar[0].sectionUrl,
          sectionTitle: filterCombinar[0].sectionTitle,
          isHidden: true
        },
        methods: {
          error(index){
            //console.log(index)
          } 
        }
      });

      new Swiper('.swiper-container--' + id, {
          slidesPerView: 6,
          slidesPerGroup: 6,
          speed: 1000,
          paginationClickable: true,
          nextButton: '.mz-bgSlider-next--' + id,
          prevButton: '.mz-bgSlider-prev--' + id,
          loop: false,
          spaceBetween: 30,
          breakpoints: {
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 30
            },
            1440: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 30
            }
          }
      });
    });
  }
  
  return Application;
})();

document.addEventListener('DOMContentLoaded', function(){
  
  setTimeout(function() {
    $('.img-product').each(function(index, obj){
      if($(obj).attr('style') === 'display: none;'){
        $(obj).closest('.swiper-slide').addClass('hidden')
      }
    })
  }, 1500);
  
});
