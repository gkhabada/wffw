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

  if ($('.leading_item').length > 2) {
    let i = 1;
    for (i; i < $('.leading_item').length; i++) {
      $($('.leading_item')[i]).hide();
    }

    // $('.leading_show-more').on('click', function () {
    //   let j = i
    //   for (i = 0; i < j + 1; i++) {
    //     console.log(i, j)
    //     $($('.leading_item')[i]).show();
    //   }
    // })

  }
