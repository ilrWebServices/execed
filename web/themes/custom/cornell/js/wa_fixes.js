( function( $ ) {
    $(document).ready(function (){
      // add Event listener to hide form (chat with us) fields when window is not popped up.
      function toggleDisplayNone() {
        if ( $('div.chat-bubble').hasClass('open')){
          $('.chat-bubble__popup button').css('display','block');
          $('.chat-bubble__popup div.chat-bubble__popup-content').css('display','block');
        }
      }
      document.querySelector('div.chat-bubble button.chat-bubble__trigger').addEventListener("click", toggleDisplayNone, false);

      // hide hamburger menu when page is zoomed in and after you tab our of the last element (search element)
      $( "#edit-keys" ).blur(function() {
        $('#hamburger').click();
      });
    });
} )( jQuery );
