// $(function () {
//   $('#registerForm').on('submit', function (e) {
//     e.preventDefault();

//     const $msg = $('#formMsg').removeClass('error success').hide();
//     const $btn = $('#submitBtn').prop('disabled', true).text('Creating…');

//     const interests = $('#interests').val()
//       .split(',')
//       .map(s => s.trim())
//       .filter(Boolean);

//     $.ajax({
//       url: 'php/register.php',
//       method: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify({
//         username: $('#username').val().trim(),
//         email: $('#email').val().trim(),
//         password: $('#password').val(),
//         name: $('#name').val().trim(),
//         age: $('#age').val(),
//         bio: $('#bio').val().trim(),
//         interests: interests
//       }),
//       success: function (res) {
//         $msg.addClass('success').text(res.message).show();
//         setTimeout(() => window.location.href = 'login.html', 900);
//       },
//       error: function (xhr) {
//         const res = xhr.responseJSON || {};
//         $msg.addClass('error').text(res.message || 'Something went wrong. Try again.').show();
//         $btn.prop('disabled', false).text('Create account');
//       }
//     });
//   });
// });
$(function () {

  $('#registerForm').on('submit', function (e) {

    e.preventDefault();

    const $msg = $('#formMsg')
      .removeClass('d-none alert-success alert-danger')
      .text('');

    const $btn = $('#submitBtn')
      .prop('disabled', true)
      .text('Creating Account...');

    const interests = $('#interests')
      .val()
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length);

    $.ajax({

      url: 'php/register.php',

      method: 'POST',

      contentType: 'application/json',

      data: JSON.stringify({

        username: $('#username').val().trim(),

        email: $('#email').val().trim(),

        password: $('#password').val(),

        name: $('#name').val().trim(),

        age: $('#age').val(),

        bio: $('#bio').val().trim(),

        interests: interests

      }),

      success: function (res) {

        $msg
          .addClass('alert alert-success')
          .text(res.message);

        setTimeout(function () {

          window.location.href = 'login.html';

        }, 900);

      },

      error: function (xhr) {

        const res = xhr.responseJSON || {};

        $msg
          .addClass('alert alert-danger')
          .text(res.message || 'Something went wrong. Please try again.');

        $btn
          .prop('disabled', false)
          .text('Create Account');

      }

    });

  });

});