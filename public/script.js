$(document).ready(function() {
            loadPosts();

            $('#btnCreate').click(function() {
                $('#postId').val('');
                $('#title').val('');
                $('#body').val('');
                $('#author').val('');
                $('#modal').show();
            });

            $('#btnCancel').click(function() {
                $('#modal').hide();
            });

            $('#btnSave').click(function() {
                var id = $('#postId').val();
                var data = {
                    title: $('#title').val(),
                    body: $('#body').val(),
                    author: $('#author').val()
                };

                var method = id ? 'PUT' : 'POST';
                var url = id ? '/blogs/' + id : '/blogs';

                $.ajax({
                    url: url,
                    type: method,
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function() {
                        $('#modal').hide();
                        loadPosts();
                    }
                });
            });
        });

        function loadPosts() {
            $.get('/blogs', function(data) {
                var html = '';
                data.forEach(function(post) {
                    html += `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <small>By: ${post.author}</small><br><br>
                        <button class="btnEdit" data-id="${post._id}" data-title="${post.title}" data-body="${post.body}" data-author="${post.author}">Edit</button>
                        <button class="btnDelete" data-id="${post._id}" style="color:red">Delete</button>
                    </div>`;
                });
                $('#posts').html(html);
            });
        }

        $(document).on('click', '.btnEdit', function() {
            var post = $(this).data();
            $('#postId').val(post.id);
            $('#title').val(post.title);
            $('#body').val(post.body);
            $('#author').val(post.author);
            $('#modal').show();``
        });

        $(document).on('click', '.btnDelete', function() {
            var id = $(this).data('id');
            $.ajax({
                url: '/blogs/' + id,
                type: 'DELETE',
                success: function() {
                    loadPosts();
                }
            });
        });