$('.my-rating-9').starRating({
  initialRating: 0.0,
    disableAfterRate: false,
  
  starSize: 24,
  onHover: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentIndex);
  },
  onLeave: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentRating);
  },
});
