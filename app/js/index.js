// custom scrooll

if ($('.last-blog_left').length) {
  new SimpleBar($('.last-blog_left')[0], {
    autoHide: false
  });
}

if ($('.other-news__items').length) {
  new SimpleBar($('.other-news__items')[0]);
}

// mobile search form toggle

$('.mobile-header__search').on('click', function(e) {
  e.preventDefault();

  $('.mobile-header__search--open, .mobile-header__breadcrumbs').addClass('hide');
  $('.mobile-header__search--close, .mobile-header__search-form').removeClass('hide');
});

$('.mobile-header__search--close').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $('.mobile-header__search--open, .mobile-header__breadcrumbs').removeClass('hide');
  $('.mobile-header__search--close, .mobile-header__search-form').addClass('hide');
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

// select

$('body')
  .on('click', function() {
    $('.strategies__head_select--open').hide(100);
  })
  .on('click', '.strategies__head_select', function(e) {
    e.stopPropagation();
    $(this).find('.strategies__head_select--open').on('click', function(e) {
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

function showNews(dataShow) {
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

    }
  })

  prevBtn.on('click', function(e) {
    e.preventDefault();

    if (currentSlide !== 1) {
      currentSlide--;
      nextBtn.addClass('can-arrow')

      checkButtons()
      toSlide()
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
          // отложенная загрузка изображений
          $(el).find('.currency_item__logo').attr('src', $(el).find('.currency_item__logo').attr('data-src'));
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

    if(allSLides.length) {
      // отложенная загрузка изображений
      allSLides[0].forEach(function(item) {
        $(item).find('.currency_item__logo').attr('src', $(item).find('.currency_item__logo').attr('data-src'));
      });
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


// article other

var touch = false;
var slideLength = $('.article-offers__items .article-offers_item').length;
var slideStep = $('.article-offers_item').first().outerWidth(true);
var slideCoordX = 0;
var slideIndex = 0;

$('.article-offers__items').on('mousedown touchstart', function(e) {
  e.preventDefault();
  touch = true;
  if (e.touches) {
    e = e.touches[0]
  }
  slideCoordX = e.clientX
});

function toSlide(dir) {
  if (dir === 1) {
    if (slideIndex+1 === slideLength) {
      return;
    }
    slideIndex++;

    $('.article-offers_item').css('transform', 'translateX(' + -(slideStep * slideIndex) +'px)');

  } else if (dir === 0) {
    if (slideIndex === 0) {
      return;
    }
    slideIndex--;

    $('.article-offers_item').css('transform', 'translateX(' + -(slideStep * slideIndex) +'px)');
  }
}

$('.article-offers__items').on('mousemove touchmove', function(e) {
  e.preventDefault();
  if (touch !== false) {
    if (e.touches) {
      e = e.touches[0]
    }
    if (slideCoordX + 150 < e.clientX) {
      toSlide(0)
      slideCoordX = e.clientX
    } else if (slideCoordX - 300 > e.clientX) {
      toSlide(1)
      slideCoordX = e.clientX
    }
  };
});

$('.article-offers .article-offer__button').on('click', function(e) {
  e.preventDefault();
  if ($(this).hasClass('article-offer__right')) {
    toSlide(1)
  } else if ($(this).hasClass('article-offer__left')) {
    toSlide(0)
  }
})

$(document).on('mouseup touchend', function() {
  touch = false;
})


// popup

$('.popup_link').on('click touchstart', function (e) {
  e.stopPropagation();
  e.preventDefault();
  if ($($(this).attr('href')).length) {

    $('#modal .modal_content').html($($(this).attr('href')).html())
    $('#modal').css('display', 'flex');
  }

  $('#modal, .modal-close').on('click', function () {
    $('#modal').hide();
    $('#modal .modal_content').html('');
  })
})

$('.modal_content').on('click', function (e) {
  e.stopPropagation();
})
