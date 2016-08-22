var types = []
$(document).ready(function(){

  var theFoodData = new Promise(function(resolve, reject) {
    $.ajax('https://galvanize-eats-api.herokuapp.com/menu').done(function(data){
      data.menu.forEach(function(food){
        types.push(food.type)
      })
      types = types.filter(function(item, index, self){
        return self.indexOf(item) == index
      })
      types.forEach(function(type){
        $('select').append(`<optgroup label="${type}" id="${type}"></optgroup>`)
      })
      data.menu.forEach(function(food){
        $(`#${food.type}`).append(`<option>${food.name} $<span class="price">${food.price}</span></option>`)
      })
      resolve()
    })
  });

  theFoodData.then(function(){
    $('.addingItem').click(function(){
      for(var i = 0; i < parseInt($('#quant').val()); i ++){
        console.log('test');
        $('.cart').append(`<p>${$('select').find(":selected").text()}</p>`);
        var foodPrice = parseFloat($('select').find(":selected").text().substr($('select').find(":selected").text().indexOf('$') + 1))
        $('.subTot').text(parseFloat($('.subTot').text()) + foodPrice)
        console.log($('.subTot').text());
      }
    })
  })
})
