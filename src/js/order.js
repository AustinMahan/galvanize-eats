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
      var quant = parseInt($('#quant').val())
      for(var i = 0; i < quant; i ++) {
        var selectedOpt = $('select').find(":selected").text()
        var foodPrice = parseFloat(selectedOpt.substr(selectedOpt.indexOf('$') + 1));
        $('.cart').append(`<p><i class="fa fa-times"></i>${selectedOpt.substr(0, selectedOpt.indexOf('$') - 2)} <span>$${foodPrice}</span></p>`);
        $('.subTot').text((parseFloat($('.subTot').text()) + foodPrice).toFixed(2));
        var subTotal = parseFloat($('.subTot').text())
      }
      $('.tax').text((subTotal * .08).toFixed(2));
      $('.grand').text((subTotal + parseFloat($('.tax').text())).toFixed(2));

      $('i').click(function(){
        $(this).parent().remove()
        var priceRm = parseFloat($(this).parent().text().substr($(this).parent().text().indexOf('$') + 1))
        subTotal -= priceRm
        $('.subTot').text(subTotal.toFixed(2))
        $('.tax').text((subTotal * .08).toFixed(2));
        $('.grand').text((subTotal + parseFloat($('.tax').text())).toFixed(2));
      })
    });
  });
  $('#deliver').click(function() {
    var phone = $('#phone').val()
    phone = phone.split('')
    phone = phone.filter(function(el){
      var isNum = parseInt(el)
      if(isNum == 0 || isNum){
        return isNum.toString()
      }
    })
    phone = phone.join('')
    console.log(phone);
    if(phone.length == 10){
      $.ajax({
        url: 'https://galvanize-eats-api.herokuapp.com/orders',
        method: 'POST',
        data: {name: $('#name').val(), address: $('#address').val(), phone: $('#phone').val()}
      }).done(function(succ) {
        alert(succ);
      }).fail(function(err) {
        alert(err);
      });
    }else{
      alert('Enter a valid phone number')
    }
  });
});
