// $(function () {
//   $('#loginForm').on('submit', function (e) {
//     e.preventDefault();

//     const $msg = $('#formMsg').removeClass('error success').hide();
//     const $btn = $('#submitBtn').prop('disabled', true).text('Signing in…');

//     $.ajax({
//       url: 'php/login.php',
//       method: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify({
//         identifier: $('#identifier').val().trim(),
//         password: $('#password').val()
//       }),
//       success: function (res) {
//         $msg.addClass('success').text(res.message).show();
//         setTimeout(() => window.location.href = 'profile.html', 600);
//       },
//       error: function (xhr) {
//         const res = xhr.responseJSON || {};
//         $msg.addClass('error').text(res.message || 'Something went wrong. Try again.').show();
//         $btn.prop('disabled', false).text('Sign in');
//       }
//     });
//   });
// });
$(function () {

  $('#loginForm').on('submit', function (e) {

    e.preventDefault();

    const $msg = $('#formMsg')
      .removeClass('d-none alert-success alert-danger')
      .text('');

    const $btn = $('#submitBtn')
      .prop('disabled', true)
      .text('Signing In...');

    $.ajax({

      url: 'php/login.php',

      method: 'POST',

      contentType: 'application/json',

      data: JSON.stringify({

        identifier: $('#identifier').val().trim(),

        password: $('#password').val()

      }),

      success: function (res) {

        $msg
          .addClass('alert alert-success')
          .text(res.message);

        setTimeout(function () {

          window.location.href = 'profile.html';

        }, 700);

      },

      error: function (xhr) {

        const res = xhr.responseJSON || {};

        $msg
          .addClass('alert alert-danger')
          .text(res.message || 'Something went wrong. Please try again.');

        $btn
          .prop('disabled', false)
          .text('Sign In');

      }

    });

  });

});