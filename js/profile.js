// $(function () {
//   $.ajax({
//     url: 'php/profile.php',
//     method: 'GET',
//     success: function (res) {
//       const user = res.user;
//       const profile = res.profile;

//       $('#displayName').text(profile.name || user.username);
//       $('#displayUsername').text('@' + user.username);
//       $('#avatarInitial').text((profile.name || user.username).charAt(0).toUpperCase());
//       $('#fEmail').text(user.email);
//       $('#fAge').text(profile.age || '—');
//       $('#fBio').text(profile.bio || '—');
//       $('#fSince').text(new Date(user.created_at).toLocaleDateString());

//       const $interests = $('#fInterests').empty();
//       if (profile.interests && profile.interests.length) {
//         profile.interests.forEach(tag => {
//           $('<span class="tag"></span>').text(tag).appendTo($interests);
//         });
//       } else {
//         $interests.text('—');
//       }

//       $('#loadingCard').hide();
//       $('#profileCard').show();
//     },
//     error: function () {
//       window.location.href = 'login.html';
//     }
//   });

//   $('#logoutBtn').on('click', function () {
//     $.ajax({
//       url: 'php/logout.php',
//       method: 'POST',
//       complete: function () {
//         window.location.href = 'login.html';
//       }
//     });
//   });
// });
$(function () {

  $.ajax({

    url: 'php/profile.php',

    method: 'GET',

    success: function (res) {

      const user = res.user;
      const profile = res.profile;

      $('#displayName').text(profile.name || user.username);

      $('#displayUsername').text('@' + user.username);

      $('#avatarInitial').text(
        (profile.name || user.username)
          .charAt(0)
          .toUpperCase()
      );

      $('#fEmail').text(user.email);

      $('#fAge').text(profile.age || '—');

      $('#fBio').text(profile.bio || '—');

      $('#fSince').text(
        new Date(user.created_at).toLocaleDateString()
      );

      const $interests = $('#fInterests').empty();

      if (profile.interests && profile.interests.length) {

        profile.interests.forEach(function (interest) {

          $('<span class="badge bg-primary me-2 mb-2"></span>')
            .text(interest)
            .appendTo($interests);

        });

      } else {

        $interests.text('—');

      }

      $('#loadingCard').hide();

      $('#profileCard').show();

    },

    error: function () {

      window.location.href = 'login.html';

    }

  });

  $('#logoutBtn').on('click', function () {

    $.ajax({

      url: 'php/logout.php',

      method: 'POST',

      complete: function () {

        window.location.href = 'login.html';

      }

    });

  });

});
