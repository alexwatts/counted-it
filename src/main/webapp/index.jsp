<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page isELIgnored="false" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF8">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <link rel="stylesheet" media="screen" href="main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <!-- nasty workaround to close bootstap nav menu after clicking -->
    <script type="text/javascript">
        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
                $(this).collapse('hide');
            }
        });
    </script>
</head>
<body>
<div id="main" class="container"></div>
<script src="js/main.js"></script>
</body>
</html>
