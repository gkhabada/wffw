// toggle language select

$('body')
  .on('click', function () {
    $('.choose-language__select').hide(100);
  })
  .on('click', '.header_choose-language', function (e) {
    e.stopPropagation();
    $(this).find('.choose-language__select').on('click', function (e) {
      e.stopPropagation();
    }).toggle(100);
  });


  // leading show more

  if ($('.leading_item').length > 6) {

    let leadingCount = $('.leading_item').length
    let i = 6;
    for (let i = 6; i < leadingCount; i++) {
      $($('.leading_item')[i]).hide();
    }


    $('.leading_show-more').on('click', function () {
      if(i <= leadingCount) {
      let j = i;
      for (i; i < j + 6 && i < leadingCount; i++) {
        $($('.leading_item')[i]).show();
      }
      i = j + 6;
      }
    })

  }

  // last-blog_tab-links

  $('.last-blog_tab-links a').on('click', function (e) {
    e.preventDefault();

    $('.last-blog_tab-links li').removeClass('active_tab');
    $(this).closest('li').addClass('active_tab');

    let dataShow = $(this).attr('href')
    if (dataShow === 'all') {
      $('.news__last').show();
    } else {
      $('.news__last').each(function(index, el) {
        if($(el).attr('data-show') === dataShow) {
          $(el).show();
        } else {
          $(el).hide();
        }
      });
    }
  })


  // stocks


  let stocksCount = $('.stocks .stocks_item').length;
  let slideCount = Math.ceil(stocksCount / 12);
  let prevBtn = $('.stocks .prev-arrow');
  let nextBtn = $('.stocks .next-arrow');
  let countShow = 16;
  let currentSlide = 1;

  for (let i = countShow; i < stocksCount; i++) {
    $('.stocks .stocks_item').eq(i).hide();
  }


//
  let allSLides = [];

  for (var i = 0; i < slideCount; i++) {
    allSLides[i] = []

    for (var i = 0; i < countShow; i++) {
      allSLides.push($('.stocks .stocks_item')[i])
    }

  }

  console.log(allSLides)

  //

  nextBtn.on('click', function (e) {
    e.preventDefault();

    if(slideCount > 1 && currentSlide !== slideCount) {
      currentSlide++;
      prevBtn.addClass('can-arrow')

      if (currentSlide === slideCount) {
        nextBtn.removeClass('can-arrow')
      }

    }
  })

  prevBtn.on('click', function (e) {
    e.preventDefault();

    if(currentSlide !== 1) {
      currentSlide--;
      nextBtn.addClass('can-arrow')

      if(currentSlide === 1) {
        prevBtn.removeClass('can-arrow')
      }

    }
  })









 //  function Slider(obj) {
 //   this.images = document.querySelectorAll(obj.images);
 //   this.auto = obj.auto;
 //   this.btnPrev = obj.btnPrev;
 //   this.btnNext = obj.btnNext;
 //   this.rate = obj.rate || 1000;
 //   this.count = obj.count || 1;
 //
 //   if (obj.dots) {
 //     document.querySelector(obj.dots).innerHTML = '';
 //     for (let j = 0; j < this.images.length; j++) {
 //       let span = document.createElement('span');
 //       document.querySelector(obj.dots).appendChild(span);
 //       this.images[j].classList.remove('showed');
 //     }
 //     document.querySelector(obj.dots + ' span').classList.add('active');
 //     this.images[0].classList.add('showed');
 //     this.dots = document.querySelector(obj.dots).childNodes;
 //   }
 //
 //   var i = 0;
 //   var slider = this;
 //   this.prev = function() {
 //     slider.images[i].classList.remove('showed');
 //     slider.dots[i].classList.remove('active');
 //     i--;
 //
 //     if (i < 0) {
 //       i = slider.images.length - 1;
 //     }
 //
 //     slider.images[i].classList.add('showed');
 //
 //     if (slider.dots) {
 //       slider.dots[i].classList.add('active');
 //     }
 //   }
 //   this.next = function() {
 //     slider.images[i].classList.remove('showed');
 //     slider.dots[i].classList.remove('active');
 //     i++;
 //
 //     if (i >= slider.images.length) {
 //       i = 0;
 //     }
 //
 //     slider.images[i].classList.add('showed');
 //
 //     if (slider.dots) {
 //       slider.dots[i].classList.add('active');
 //     }
 //   }
 //   document.querySelector(slider.btnPrev).onclick = slider.prev;
 //   document.querySelector(slider.btnNext).onclick = slider.next;
 //
 //   var touchCoord = 0;
 //   $(obj.images).on('mousedown touchstart', function(e) {
 //     e.preventDefault();
 //     slideRates = true;
 //     if (e.touches) {e = e.touches[0]}
 //     touchCoord = e.clientX
 //   });
 //
 //
 //   $(obj.images).on('mousemove touchmove', function(e) {
 //     e.preventDefault();
 //     if (slideRates !== false) {
 //       if (e.touches) {e = e.touches[0]}
 //       if (touchCoord + 80 < e.clientX) {
 //         slider.prev();
 //         slideRates = false;
 //       } else if (touchCoord - 80 > e.clientX) {
 //         slider.next();
 //         slideRates = false;
 //       }
 //
 //     };
 //   });
 //
 //   if (slider.auto) {
 //     setInterval(slider.next, slider.rate);
 //   }
 // }
 //
 // var slideRates = false;
 // function initRatesSlider () {
 //   if ($(window).width() <= 768 && $('.rates').length) {
 //     new Slider({
 //       images: '.stocks .stocks_item',
 //       btnPrev: '.stocks .prev-arrow',
 //       btnNext: '.stocks .next-arrow',
 //       auto: false,
 //     });
 //   }
 // }
 // initRatesSlider();
 //
 // $(window).resize(function() {
 //   initRatesSlider();
 // });



// mobile menu

$('.mobile-header__burger').on('click', function() {
  // $('.mobile-menu').css('left', '0');
  $('.mobile-menu').css('display', 'flex');
  $('#wrapper').css('overflow-x', 'hidden');

  $('section, footer').css({
    'transform': 'translateX(calc(100vw - 92px))'
  });
});

function closeMobileMenu () {
  $('.mobile-menu').css('display', 'none');
  $('section, footer').css('transform', 'translateX(0)');

}
$('.mobile-menu__close, section, footer').on('click', function () {
  closeMobileMenu();
});

















//
