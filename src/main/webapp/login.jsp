<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE>
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
    <script src="js/janrain-init.js"></script>
    <script type="text/javascript">
        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
                $(this).collapse('hide');
            }
        });
    </script>
</head>
<body>
<div class="container">
    <div class="row">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class=navbar-brand active">Counted It</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Login<span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="my-profile">Profile</a></li>
                                <li class="divider"></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="page-header">
        <h1>This is Counted It <small>Login to start counting</small></h1>
    </div>
    <div class="row">
        <div class="col-md-3 col-xs-3">
            <div id="janrainEngageEmbed"></div>
        </div>
        <div class="col-md-3 col-xs-3">
            <div class="well well-sm">
                <img class="img-container" src="example.png"></img>
                <span class="label label-primary">Track things over time</span>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-default navbar top15">
        <div class="container">
            <a href="https://cloud.google.com/"><img class="footer" src="powered-by-gcp.png"></img></a>
            <a class="pull-right" href="http://facebook.github.io/react/"><img class="footer" src="react_flux.png"></img></a>
        </div>
    </nav>
</div>
</body>
</html>