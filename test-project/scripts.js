const card = document.getElementById('myCard');

card.addEventListener('click', function() {
  this.classList.toggle('clicked');
});