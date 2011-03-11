(function($) {
   var cometd = $.cometd;

   $.fn.extend({
      wgu : function(config) {
         function _connectionEstablished() {
            $('#body').append('<div>CometD Connection Established</div>');
         }

         function _connectionBroken() {
            $('#body').append('<div>CometD Connection Broken</div>');
         }

         function _connectionClosed() {
            $('#body').append('<div>CometD Connection Closed</div>');
         }

         var _connected = false;
         function _metaConnect(message) {
            $('#body').append(message);
            if (cometd.isDisconnected()) {
               _connected = false;
               _connectionClosed();
               return;
            }

            var wasConnected = _connected;
            _connected = message.successful === true;
            if (!wasConnected && _connected) {
               _connectionEstablished();
            }
            else if (wasConnected && !_connected) {
               _connectionBroken();
            }
         }

         // Function invoked when first contacting the server and
         // when the server has lost the state of this client
         function _metaHandshake(handshake) {
            if (handshake.successful) {
               cometd.batch(function() {
                  $.each(config.subscriptions, function(i, ep) {
                     cometd.subscribe(ep.path, function(message) {
                        $('#body').append('<div>' + ep.name + ' Feed: ' + message.data.body + '</div>');
                     });
                  });
                  /*
                   * cometd.subscribe('/hello', function(message) {
                   * $('#body').append('<div>Server Says: ' +
                   * message.data.greeting + '</div>'); }); // Publish on a
                   * service channel since the message is for the // server only
                   * cometd.publish('/service/hello', { name : 'World' });
                   */
               });
            }
         }

         // Disconnect when the page unloads
         $(window).unload(function() {
            cometd.disconnect(true);
         });

         cometd.configure({
            url : config.url,
            logLevel : 'info'
         });

         cometd.addListener('/meta/handshake', _metaHandshake);
         cometd.addListener('/meta/connect', _metaConnect);

         cometd.handshake();
      }
   });
})(jQuery);
