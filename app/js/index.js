// custom scrooll


new SimpleBar($('.last-blog_left')[0], {
  autoHide: false
});

new SimpleBar($('.other-news__items')[0], {
  // autoHide: false
});



// toggle language select

$('body')
  .on('click', function() {
    $('.choose-language__select').hide(100);
  })
  .on('click', '.header_choose-language', function(e) {
    e.stopPropagation();
    $(this).find('.choose-language__select').on('click', function(e) {
      e.stopPropagation();
    }).toggle(100);
  });


// leading show more



function showLeadingItems(count) {
  if ($('.leading_item').length > count) {

    let leadingCount = $('.leading_item').length
    let i = count;
    for (let i = count; i < leadingCount; i++) {
      $($('.leading_item')[i]).hide();
    }


    $('.leading_show-more').on('click', function() {
      if (i <= leadingCount) {
        let j = i;
        for (i; i < j + count && i < leadingCount; i++) {
          $($('.leading_item')[i]).show();
        }
        i = j + count;
        if (i >= leadingCount) {
          $('.leading_show-more').hide();
        }
      }
    })

  } else {
    console.log(1)
    $('.leading_show-more').hide();
  }
}


function adaptiveLeadingItems() {
  if (window.innerWidth < 768) {
    showLeadingItems(3);
  } else {
    showLeadingItems(6);
  }
}
adaptiveLeadingItems();

$(window).resize(function() {
  adaptiveLeadingItems();
});

// last-blog_tab-links

function showNews (dataShow) {
  if (dataShow === 'all') {
    $('.news__last').show();
  } else {
    $('.news__last').each(function(index, el) {
      if ($(el).attr('data-show') === dataShow) {
        $(el).show();
      } else {
        $(el).hide();
      }
    });
  }
}

$('.last-blog_tab-links a').on('click', function(e) {
  e.preventDefault();

  $('.last-blog_tab-links li').removeClass('active_tab');
  $(this).closest('li').addClass('active_tab');

  showNews($(this).attr('href'))
})

$('.last-blog_select').on('change', function() {
  showNews($(this).val())
})


// currency

function Slider(obj) {

  let items = $(obj.items);
  let currencyCount = items.length;
  let prevBtn = $(obj.btnPrev);
  let nextBtn = $(obj.btnNext);
  let countShow = obj.itemsShowCount;
  let slideCount = Math.ceil(currencyCount / countShow);
  let currentSlide = 1;
  let allSLides = [];

  if (slideCount === 1) {
    $(items).closest('.currency').find('.currency_head_actions').hide();
  }

  firstShow()
  toSlide()

  nextBtn.on('click', function(e) {
    e.preventDefault();

    if (slideCount > 1 && currentSlide !== slideCount) {
      currentSlide++;
      prevBtn.addClass('can-arrow')

      checkButtons()
      toSlide()

      console.log(slideCount, currentSlide)

    }
  })

  prevBtn.on('click', function(e) {
    e.preventDefault();

    if (currentSlide !== 1) {
      currentSlide--;
      nextBtn.addClass('can-arrow')

      checkButtons()
      toSlide()

console.log(slideCount, currentSlide)
    }
  })

  function checkButtons() {

    if (currentSlide === 1) {
      prevBtn.removeClass('can-arrow')
    } else {
      prevBtn.addClass('can-arrow')
    }

    if (currentSlide === slideCount) {
      nextBtn.removeClass('can-arrow')
    } else {
      nextBtn.addClass('can-arrow')
    }

  }

  function toSlide(index) {
    for (var i = 0; i < allSLides.length; i++) {
      if (i == currentSlide - 1) {
        allSLides[currentSlide - 1].forEach(function(el) {
          $(el).show();
        });
      } else {
        allSLides[i].forEach(function(el) {
          $(el).hide();
        });
      }
    }
  }

  function firstShow() {
    let j = 0
    for (var i = 0; i < slideCount; i++) {
      allSLides[i] = []
      for (j; j < countShow * (i + 1); j++) {
        if ($(items)[j]) {
          allSLides[i].push($(items)[j])
        }
      }
    }
  }

  $(obj.filter).on('change', function() {

    let country = $(this).val();
    let filteredcurrency = []

    if (country == 'all') {
      filteredcurrency = obj.items
    } else {
      $(this).closest('.currency').find('.currency_item').each(function(index, el) {
        if ($(el).attr('data-country') == country) {
          filteredcurrency.push($(el))
        } else {
          $(el).hide();
        }
      });
    }

    items = $(filteredcurrency);
    currencyCount = items.length;
    slideCount = Math.ceil(currencyCount / countShow);
    currentSlide = 1;
    allSLides = [];

    firstShow()
    toSlide()
    checkButtons()

  })

}

function sliderInits(count) {
  let allSlides = ['.mart', '.indices', '.valuta', '.cryptocurrencies']
  allSlides.forEach(function(item) {
    new Slider({
      items: `${item} .currency_item`,
      btnPrev: `${item} .prev-arrow`,
      btnNext: `${item} .next-arrow`,
      itemsShowCount: count
    });
  });
  new Slider({
    items: '.stocks .currency_item',
    btnPrev: '.stocks .prev-arrow',
    btnNext: '.stocks .next-arrow',
    itemsShowCount: count,
    filter: '.stocks .currency_country'
  });
}

function adaptiveSlider() {
  if (window.innerWidth < 480) {
    sliderInits(4);
  } else if (window.innerWidth < 850) {
    sliderInits(8);
  } else if (window.innerWidth < 1150) {
    sliderInits(12);
  } else {
    sliderInits(16);
  }
}
adaptiveSlider();

$(window).resize(function() {
  adaptiveSlider();
});

// mobile menu

$('.mobile-header__burger').on('click', function() {
  // $('.mobile-menu').css('left', '0');
  $('.mobile-menu').css('display', 'flex');
  $('#wrapper').css('overflow-x', 'hidden');

  $('section, footer').css({
    'transform': 'translateX(calc(100vw - 92px))'
  });
});

function closeMobileMenu() {
  $('.mobile-menu').css('display', 'none');
  $('section, footer').css('transform', 'translateX(0)');

}
$('.mobile-menu__close, section, footer').on('click', function() {
  closeMobileMenu();
});
