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
    console.log(dataShow)
  })
