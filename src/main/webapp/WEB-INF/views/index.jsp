<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<script type="text/javascript" src="resources/jquery/jquery-1.4.3.js"></script>
	<script type="text/javascript" src="resources/jquery/json2.js"></script>
	<script type="text/javascript" src="resources/org/cometd.js"></script>
	<script type="text/javascript" src="resources/jquery/jquery.cometd.js"></script>
	<script type="text/javascript" src="resources/application.js"></script>
</head>
<body>

<ul>
	<li><a href='#' class="message">message 1</a></li>
	<li><a href='#' class="message">message 2</a></li>
</ul>

<div id="body"></div>

	<script type="text/javascript">
   $(function() {
      var server = location.host.replace(/\:\d+/g, "");
      var url1 = "http://" + server + ":9090/wgu-sp-comet/cometd";
      var url2 = "http://" + server + ":8081/sample2/cometd";
      var url = url2;

      $("#body").append("<div>" + url + "</div>");

      var server = $('body').wgu({
         url : url,
         subscriptions : [ {
            path : '/feed/global',
            name : 'Global'
         }, {
            path : '/feed/person/1',
            name : 'Person #1'
         }, {
            path : '/feed/group/10',
            name : 'Group #10'
         } ]
      });

      $('.message').click(function() {
         var message = $(this).html();
         $.cometd.publish('/feed/global', {
            body : message
         });
         return false;
      });
   });
	</script>

</body>
</html>
