$(document).ready(function() {
  $('.delete-product').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/db/'+id,
      success: function(response){
        alert('Deleting item.');
        window.location.href='/db';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});