import $ from 'jquery';

$('.my-rating-9').starRating({
  initialRating: 3.5,
  disableAfterRate: false,
  onHover: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentIndex);
  },
  onLeave: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentRating);
  },
});
