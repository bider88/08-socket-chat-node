var elems = document.getElementById('slide-out');
var instances = M.Sidenav.init(elems);

//instances.open();

$(document).ready(function() {
    $('textarea#textarea1').characterCounter();
});

var params = new URLSearchParams( window.location.search );

var name =  params.get('name')
var channel =  params.get('channel')

var divUsers = $('#divUsers')
var channelName = $('#channel-name')
var formSend = $('#formSend')
var txtMessage = $('#txtMessage')
var chatBox = $('#chatBox')
var sidenavTrigger = $('#sidenav-trigger')

function renderChannel() {
    var html = '';

    html += '<span class="brand-logo padding">Chat <span class="name-channel">' + params.get('channel')  + '</span></span>';

    channelName.html(html);
}

function renderUser(persons) {
    
    counterPersons(persons)

    var usersHtml = '';

    for (var i = 0; i < persons.length; i++) {
        usersHtml += '<li><a data-id="' + persons[i].id + '" href="javascript:void(0)"><i class="material-icons">person</i>' + persons[i].name + '</a></li>';
    }

    divUsers.html(usersHtml);
}

function counterPersons(persons) {

    var html = ''

    html += '<span class="new badge blue" data-badge-caption="">' + persons.length + '</span>'
    html += '<i class="material-icons black-text">group</i>'

    sidenavTrigger.html(html)
}

function renderMessages( message, me ) {

    var html = ''

    var date = new Date(message.date)
    var hour = date.getHours() + ':' + date.getMinutes()

    var adminClass = 'info'

    if ( me ) {
        html += '<div class="chat-message right">'
        html += '    <img class="circle responsive-img" src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/portrait2.jpg?18355964117902265498" alt="avatar">'
        html += '    <p class="name-right">'
        html += '        <b>' + message.name + '</b> <span class="time">' + hour + '</span>'
        html += '    </p>'
        html += message.message;
        html += '</div>'
    }else if (message.name === 'Admin') {
        
        html += '<div class="admin-info">'
        html += message.message + ' <span class="time">' + hour + '</span>';
        html += '</div>'

    } else {
        html += '<div class="chat-message animated fadeIn ' + adminClass + '">'
        html += '    <img class="circle responsive-img" src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/portrait1.jpg?18355964117902265498" alt="avatar">'
        html += '    <p>'
        html += '        <b>' + message.name + '</b> <span class="time">' + hour + '</span>'
        html += '    </p>'
        html += message.message;
        html += '</div>'
    }

    

    chatBox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = chatBox.children('div:last-child');

    // heights
    var clientHeight = chatBox.prop('clientHeight');
    var scrollTop = chatBox.prop('scrollTop');
    var scrollHeight = chatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatBox.scrollTop(scrollHeight);
    }
}


// Listener

divUsers.on('click', 'a', function() {
    var id = $(this).data('id');

    console.log(id);
})

formSend.on('submit', function(e) {
    e.preventDefault();

    if ( txtMessage.val().trim().length > 0 ) {

        socket.emit('createMessage', {
            name: name,
        	message: txtMessage.val()
        }, function(message) {
            txtMessage.val('').focus()
            renderMessages( message, true )
            scrollBottom()
        })

    }
})