<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page isELIgnored="false" %>

<script>
    auth = <c:out value="${auth}" escapeXml="false"/>
</script>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF8">
    <title>Document</title>
    <link rel="stylesheet" media="screen" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" media="screen" href="main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<div id="main" class="container"></div>
<script src="js/main.js"></script>
</body>
</html>
