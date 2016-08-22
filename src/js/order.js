var types = [];
$(document).ready(function() {

  var theFoodData = new Promise(function(resolve, reject) {
    $.ajax('https://galvanize-eats-api.herokuapp.com/menu').done(function(data) {
      data.menu.forEach(function(food) {
        types.push(food.type);
      });
      types = types.filter(function(item, index, self) {
        return self.indexOf(item) == index;
      });
      console.log(types);
      types.forEach(function(type) {
        $('select').append(`<optgroup label="${type}" id="${type}"></optgroup>`);
      });
      data.menu.forEach(function(food) {
        $(`#${food.type}`).append(`<option>${food.name}- $<span class="price">${food.price}</span></option>`);
      });
      resolve();
    });
  });

  theFoodData.then(function() {
    $('.addingItem').click(function() {
      for(var i = 0; i < parseInt($('#quant').val()); i ++) {
        console.log('test');
        console.log(`<p>${$('select').find(":selected").text()}</p>`);
        var foodPrice = parseFloat($('select').find(":selected").text().substr($('select').find(":selected").text().indexOf('$') + 1));
        $('.cart').append(`<p>${$('select').find(":selected").text().substr(0, $('select').find(":selected").text().indexOf('$') - 2)} <span>$${foodPrice}</span></p>`);
        $('.subTot').text((parseFloat($('.subTot').text()) + foodPrice).toFixed(2));
      }
      $('.tax').text((parseFloat($('.subTot').text()) * .08).toFixed(2));
      $('.grand').text((parseFloat($('.subTot').text()) + parseFloat($('.tax').text())).toFixed(2));
    });
  });

  $('#deliver').click(function() {
    $.ajax({
      url: 'https://galvanize-eats-api.herokuapp.com/orders',
      method: 'POST'
    }).done(function(succ) {
      alert(succ);
    }).fail(function(err) {
      alert(err);
    });
  });
});
